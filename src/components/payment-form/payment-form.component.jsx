import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";

import './payment-form.styles.scss';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProccessingPayment, setIsProccessignPayment] = useState(false);

    const paymentHandler = async (e) => {
        console.log("get here")
        e.preventDefault();

        
        if (!stripe || !elements) return;

        setIsProccessignPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());

        const { paymentIntent: { client_secret } } = response;
        console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        });

        setIsProccessignPayment(false);

        if(paymentResult.error) {
            alert(paymentResult.error)
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful')
            }
        }
    }

    return (
        <div className="payment-form-container">
            <div className="form-container">
                <h2>Credit card Payment: </h2>
                <CardElement />
                <Button className="payment-button" isLoading={isProccessingPayment} buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={paymentHandler}> Pay now </Button>
            </div>
        </div>
    )
}

export default PaymentForm;