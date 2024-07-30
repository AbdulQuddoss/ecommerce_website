const reducer = (state, action) => {

    switch (action.type) {
        case 'LOAD_FILTER_PRODUCTS':
            let priceArr = action.payload.map((currElem) => currElem.price);
            const maxPrice = Math.max(...priceArr);
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: {...state.filters, maxPrice, price: maxPrice}
            }

            case 'SET_GRID_VIEW':
                return {
                    ...state,
                    productsView: true
                }

                case 'SET_LIST_VIEW':
                return {
                    ...state,
                    productsView: false
                }

                case 'SET_SORT_VALUE':
                return {
                    ...state,
                    selected_option: action.payload
                }

                case 'UPDATE_SORTING':
                    const {filter_products, selected_option} = state;
                    let newSortedData = [...filter_products];

                    if(selected_option === 'lowest') {
                        newSortedData = filter_products.sort((a,b) => a.price - b.price);
                    }

                    if(selected_option === 'highest') {
                        newSortedData = filter_products.sort((a,b) => b.price - a.price);
                    }

                    if(selected_option === 'a-z') {
                        newSortedData = filter_products.sort((a,b) => {
                            return a.name.localeCompare(b.name);
                        })
                    }

                    if(selected_option === 'z-a') {
                        newSortedData = filter_products.sort((a,b) => {
                            return b.name.localeCompare(a.name);
                        })
                    }

                return {
                    ...state,
                    filter_products: newSortedData
                }

                case 'FILTER_UPDATE_VALUE':
                    const {name, value} = action.payload;
                    return {
                        ...state,
                        filters: {
                            ...state.filters,
                            [name]: value
                        }
                    }

                case 'UPDATE_FILTERS':
                    const {all_products} = state;
                    const {text, category, company, color, price} = state.filters;
                    let temFilterProducts = [...all_products];

                    if(text) {
                        temFilterProducts = temFilterProducts.filter((currElem, index) => {
                            return currElem.name.toLowerCase().includes(text);
                        })
                    }

                    if(category !== 'All') {
                        temFilterProducts = temFilterProducts.filter((currElem, index) => {
                            return currElem.category === category;
                        })
                    }

                    if(company !== 'All') {
                        temFilterProducts = temFilterProducts.filter((currElem, index) => {
                            return currElem.company === company;
                        })
                    }

                    if(color !== 'All') {
                        temFilterProducts = temFilterProducts.filter((currElem, index) => {
                            return currElem.colors.includes(color);
                        })
                    }

                    if(price) {
                        temFilterProducts = temFilterProducts.filter((currElem, index) => {
                            return currElem.price <= price;
                        })
                    }

                    return {
                        ...state,
                        filter_products: temFilterProducts
                    }

                case 'CLEAR_FILTERS':
                    return {
                        ...state,
                        filter_products: [...action.payload],
                        all_products: [...action.payload],
                        filter: {
                            ...state.filters,
                            text: "",
                            category: "All",
                            company: "All",
                            color: "All",
                            maxPrice: 0,
                            minPrice: state.filters.maxPrice,
                            price: state.filters.maxPrice
                        }
                    }
    
        default:
            return state;
    }
}

export default reducer;