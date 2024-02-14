import { useDispatch } from 'react-redux';

import { addItemToCart, removeItemFromCart, decreaseItemFromCart } from '../../store/cart/cart.slice';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    const { name, imageUrl, price, quantity } = cartItem;

    const clearItemHandler = () => dispatch(removeItemFromCart(cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItem));
    const removeItemHandler = () => dispatch(decreaseItemFromCart(cartItem));


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