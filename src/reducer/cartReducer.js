const reducer = (state, action) => {

    if(action.type === 'ADD_TO_CART') {
        const {id, color, amount, product} = action.payload;

        let ifItemExist = state.cart.find((currElm) => {
            return currElm.id === id + color;
        })

        if(ifItemExist) {
            let updatedItem = state.cart.map((currElem) => {
                if(currElem.id === id + color) {
                    let newAmount = currElem.amount + amount;
                    if(newAmount >= currElem.max) {
                        newAmount = currElem.max;
                    }
                    return {
                        ...currElem,
                        amount: newAmount
                    }
                } else {
                    return currElem;
                }
            })
            return {
                ...state,
                cart: updatedItem
            }
        } else {
            let cartProduct = {
                id: id + color,
                name: product.name,
                color,
                amount,
                image: product.image[0].url,
                price: product.price,
                max: product.stock
            }
    
            return {
                ...state,
                cart: [...state.cart, cartProduct]
            }
        }
    }

    if(action.type === 'SET_INCREASE') {
        let selectCart = state.cart.map((currElem) => {
            if(currElem.id === action.payload) {
                let updatedValue = currElem.amount + 1;
                if(updatedValue >= currElem.max) updatedValue = currElem.max;
                return {
                    ...currElem,
                    amount: updatedValue
                }
            } else {
                return currElem;
             }
        })

        return {
            ...state,
            cart: selectCart
        }
    }

    if(action.type === 'TOTAL_CART') {
        const totalItems = state.cart.reduce((total, currElem) => {
            return total += currElem.amount;
          }, 0)

          return {
            ...state,
            total_items: totalItems
          }
    }

    if(action.type === 'TOTAL_PRICE') {
        const totalPrice = state.cart.reduce((total, currElem) => {
            return total += currElem.amount * currElem.price;
          }, 0)

          return {
            ...state,
            total_price: totalPrice
          }
    }

    if(action.type === 'SET_DECREASE') {
        let selectCart = state.cart.map((currElem) => {
            if(currElem.id === action.payload) {
                let updatedValue = currElem.amount - 1;
                if(updatedValue <= 1) updatedValue = 1;
                return {
                    ...currElem,
                    amount: updatedValue
                }
            } else {
                return currElem;
             }
        })

        return {
            ...state,
            cart: selectCart
        }
    }

    if(action.type === 'REMOVE_CART') {
        let afterRemove = state.cart.filter((currElem, index) => currElem.id !== action.payload);

        return {
            ...state,
            cart: afterRemove
        }
    }

    if(action.type === 'CLEAR_CARTS') {
        return {
            ...state,
            cart: []
        }
    }

    return state;
}

export default reducer;