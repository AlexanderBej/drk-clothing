import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, decreaseItemFromCart } from '../../store/cart/cart.action';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    const { name, imageUrl, price, quantity } = cartItem;
    const cartItems = useSelector(selectCartItems);

    const clearItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(decreaseItemFromCart(cartItems, cartItem));


    return (
        <div className='checkout-item-container'>
            <div className='img-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'> {price} </span>
            <div className='remove-btn' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;