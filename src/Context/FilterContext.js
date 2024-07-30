import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/filterReducer";
import { useProductContext } from "./ProductContext";
const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  productsView: true,
  selected_option: 'lowest',
  filters: {
    text: "",
    category: "All",
    company: "All",
    color: "All",
    maxPrice: 0,
    minPrice: 0,
    price: 0
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  const sorting = (e) => {
    dispatch({ type: "SET_SORT_VALUE", payload: e.target.value });
  };

  useEffect(() => {
    dispatch({ type: "UPDATE_SORTING" });
  }, [state.selected_option]);

  useEffect(() => {
    dispatch({ type: "UPDATE_FILTERS" });
  }, [state.filters]);

  const filterUpdateValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch({ type: "FILTER_UPDATE_VALUE", payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({type: "CLEAR_FILTERS", payload: products});
  }
  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, sorting, filterUpdateValue, clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
