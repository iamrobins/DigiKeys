import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_RESET} from "../constants/cartConstants";

export const addToCart = (product, qty) => async (dispatch, getState) => {
  // const cartItem = {
  //   name: product.name,
  //   image: product.image,
  //   category: product.category,
  //   price: product.price,
  //   qty: qty,
  //   product: product._id,
  //   seller: product.seller._id,
  //   countInStock: product.countInStock,
  // }
  dispatch({type: CART_ADD_ITEM, payload: {...product, qty}});
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const savePaymentMethod = (pMethod) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: pMethod });

  localStorage.setItem('paymentMethod', JSON.stringify(pMethod));
}

export const resetCart = () => (dispatch) => {
  dispatch({ type: CART_RESET });
  localStorage.removeItem("cartItems");
}