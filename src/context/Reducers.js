// Action Types
export const ActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
  };
 
  
  // Reducer Function
  export const cartReducer = (state, action) => {
    console.log("state from reducer", state, "action", action);
    
    switch (action.type) {
      case ActionTypes.ADD_TO_CART:
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      case ActionTypes.REMOVE_FROM_CART:
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.id),
        };
      case ActionTypes.CLEAR_CART:
        return {
          ...state,
          cart: [],
        };
      default:
        return state;
    }
  };
  

  export const productReducer = (state, action) => {
    switch (action.type) {
      case "SORT_BY_PRICE":
        return { ...state, sort: action.payload };
      case "FILTER_BY_STOCK":
        return { ...state, byStock: !state.byStock };
      case "FILTER_BY_DELIVERY":
        return { ...state, byFastDelivery: !state.byFastDelivery };
      case "FILTER_BY_RATING":
        return { ...state, byRating: action.payload };
      case "FILTER_BY_SEARCH":
        return { ...state, searchQuery: action.payload };
      case "CLEAR_FILTERS":
        return { byStock: false, byFastDelivery: false, byRating: 0 };
      default:
        return state;
    }
  };