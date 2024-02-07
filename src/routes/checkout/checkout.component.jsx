import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

const Checkout = () => {
    const { cartItems } = useContext(CartContext);
    console.log(cartItems)
    return (
        <div className="checkout-container">
            <div className='checkout-items'>
                {cartItems.map((item) => (
                    <div className="checkout-item">
                        <img src={item.imageUrl} alt={item.name} />

                        <div className="item-details">
                            <span>{item.name}</span>
                            
                            <div className="quantity-container">
                                <button>?</button>
                                <span>{item.quantity}</span>
                                <button>!</button>
                            </div>
                            <span>{item.price}</span>
                            <button>X</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Checkout;