import { createSlice } from "@reduxjs/toolkit";

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
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

export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload;
        },
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        decreaseItemFromCart(state, action) {
            state.cartItems = decreaseCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
    }
})

export const { addItemToCart, setIsCartOpen, decreaseItemFromCart, removeItemFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
