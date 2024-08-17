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
        // return {
        //   ...state,
        //   // cart: [...state.cart, action.payload],
        //   cart: [...state.cart, { ...action.payload, numOfItem: 1 }],
        // };

        // const existingItem = state.cart.find(item => item.id === action.payload.id);
        const existingItem = "prodId" in action.payload
      console.log("existingItem", existingItem);
      
      if (existingItem) {
        // If the item is already in the cart, update its quantity
        return {
          ...state,
          cart: state.cart.map(item =>
          {
            if( item.id === action.payload.prodId){

            return { ...item, numOfItem: parseInt(action.payload.numOfItem) }
            }else{
              return item
            }
          }
          ),
        };
      } else {
        // If the item is not in the cart, add it with numOfItem set to 1
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, numOfItem: 1 }],
        };
      }

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
        return { ...state, sortByPrice: action.payload };
      case "FILTER_BY_STOCK":
        return { ...state, byStock: !state.byStock };
      case "FILTER_BY_DELIVERY":
        return { ...state, byFastDelivery: !state.byFastDelivery };
      case "FILTER_BY_RATING":
        return { ...state, byRating: action.payload };
      case "FILTER_BY_SEARCH":
        return { ...state, searchQuery: action.payload };
      case "CLEAR_FILTERS":
        return { byStock: false, byFastDelivery: false, byRating: 0, sortByPrice: null };
      default:
        return state;
    }
  };