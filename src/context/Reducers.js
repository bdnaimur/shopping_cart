// Action Types
export const ActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
  };
  
  // Initial State
  const initialState = {
    cart: [],
  };
  
  // Reducer Function
  export const cartReducer = (state, action) => {
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
  