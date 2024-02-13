import { useSelector } from "react-redux";

import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import './checkout.styles.scss';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    console.log(cartItems)
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    Product
                </div>
                <div className="header-block">
                    Description
                </div>
                <div className="header-block">
                    Quantity
                </div>
                <div className="header-block">
                    Price
                </div>
                <div className="header-block">
                    Remove
                </div>
            </div>
            {cartItems.map((item) => <CheckoutItem key={item.id} cartItem={item} />)}
            <span className="total">Total: ${cartTotal}</span>
        </div>
    )
}

export default Checkout;