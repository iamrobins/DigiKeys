import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

//reducers
import {authLoginReducer, authRegisterReducer, authForgotPasswordReducer, authResetPasswordReducer} from "./reducers/authReducers";
import {userProfileReducer, userProductsReducer, userFeedbacksReducer} from "./reducers/userReducers";
import {productDetailsReducer} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {orderCreateReducer, orderDetailsReducer, orderPayReducer} from "./reducers/orderReducers";
import {searchProductsReducer, searchUsersReducer} from "./reducers/searchReducers";

const reducer = combineReducers({
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  authForgotPassword: authForgotPasswordReducer,
  authResetPassword: authResetPasswordReducer,
  //User Reducers
  userProfile: userProfileReducer,
  userProducts: userProductsReducer,
  userFeedbacks: userFeedbacksReducer,
  //Product Reducers
  productDetails: productDetailsReducer,
  //Cart Reducers
  cart: cartReducer,
  // Order Reducers
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  // Search
  searchProducts: searchProductsReducer,
  searchUsers: searchUsersReducer
})

const loadFromStorage = (key, value=null) => {
  return Boolean(localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : value
}

const userInfoFromStorage = loadFromStorage("userInfo");
const cartItemsFromStorage = loadFromStorage("cartItems", []);
const paymentMethodFromStorage = loadFromStorage("paymentMethod", "");
const productsFromStorage = loadFromStorage("products", []);
const usersFromStorage = loadFromStorage("users", []);

const initialState = {
  authLogin: { userInfo: userInfoFromStorage , isLogined: Boolean(userInfoFromStorage) },
  // authRegister: { userInfo: userInfoFromStorage, isLogined: Boolean(userInfoFromStorage) } no need for this because I'm pushing user to login screen after registration
  cart : { cartItems: cartItemsFromStorage, paymentMethod: paymentMethodFromStorage },
  searchProducts: { products: productsFromStorage },
  searchUsers: { users: usersFromStorage }
}

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;