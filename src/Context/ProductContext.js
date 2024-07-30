import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";
const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const AppProvider = ({children}) => {

    const initialState = {
        isLoading: false,
        isSingleLoading: false,
        isError: false,
        products: [],
        featureProducts: [],
        singleProdut: {}
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const getApiData = async (url) => {

        dispatch({type: "SET_LOADING"});

        try {
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({type: "SET_API_DATA", payload: products});
        } catch (error) {
            console.log("Error occurring during API call" + error);
            dispatch({type: "SET_ERROR"});
        }
        
    }

    const getSingleProduct = async (url) => {

        dispatch({type: "SET_SINGLE_LOADING"});

        try {
            const res = await axios.get(url);
            const product = await res.data;
            dispatch({type: "SET_API_SINGLE_PRODUCT", payload: product});
        } catch (error) {
            dispatch({type: "SET_SINGLE_PRODUCT_ERROR"});
        }
    }
    useEffect(() => {
        getApiData(API);
    }, [])

  return  (
  <AppContext.Provider value={{...state, getSingleProduct}}>{children}</AppContext.Provider>
);
}

const useProductContext = () => {
    return useContext(AppContext);
}

export {AppProvider, AppContext, useProductContext};