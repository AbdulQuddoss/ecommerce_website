import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalStorageData = () => {
    let storageData = localStorage.getItem('cart');
    if(storageData.length === 0) {
        return [];
    } else {
        return JSON.parse(storageData);
    }
}

const initialState = {
    cart: getLocalStorageData(),
    total_items: "",
    total_price: "",
    shipping_fee: 50000
}

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({type: 'ADD_TO_CART', payload: {id, color, amount, product}});
    }
    const removeCart = (id) => {
        dispatch({type: 'REMOVE_CART', payload: id});
    }
    useEffect(() => {
        dispatch({type: 'TOTAL_CART'});
        dispatch({type: 'TOTAL_PRICE'});
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    const setIncrease = (id) => {
        dispatch({type: 'SET_INCREASE', payload: id});
    }

    const setDecrease = (id) => {
        dispatch({type: 'SET_DECREASE', payload: id});
    }

    const clearCarts = () => {
        dispatch({type: 'CLEAR_CARTS'});
    }

    return <CartContext.Provider value={{...state, addToCart, removeCart, clearCarts, setIncrease, setDecrease}}>{children}</CartContext.Provider>
}

export const useCartContext = () => {
    return useContext(CartContext);
}