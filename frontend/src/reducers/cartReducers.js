import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_RESET} from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: [], paymentMethod: ""}, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(product => product._id === item._id);
      console.log(existItem);
      if(existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(product => product._id === existItem._id ? item : product)
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state, 
        cartItems: state.cartItems.filter(product => product._id !== action.payload)
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    case CART_RESET:
      return {cartItems: []};
    default:
      return state;
  }
}