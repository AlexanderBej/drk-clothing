import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'

}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    cartTotal: 0,
    decreaseItemFromCart: () => { },
    removeItemFromCart: () => { }
})

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        dispatch(createAction(
            CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal
            }))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const decreaseItemFromCart = (productToDecrease) => {
        const newCartItems = decreaseCartItem(cartItems, productToDecrease);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        decreaseItemFromCart,
        removeItemFromCart,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}