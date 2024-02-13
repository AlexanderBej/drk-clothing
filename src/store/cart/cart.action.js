import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const decreaseItemFromCart = (cartItems, productToDecrease) => {
    const newCartItems = decreaseCartItem(cartItems, productToDecrease);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}




const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ?
                { ...cartItem, quantity: cartItem.quantity + 1 } :
                cartItem);
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const decreaseCartItem = (cartItems, productToDecrease) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToDecrease.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToDecrease.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToDecrease.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 } :
            cartItem);
}

const removeCartItem = (cartItems, productToRemove) => cartItems.filter(cartItem => cartItem.id !== productToRemove.id);