import {
  USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,
  USER_PRODUCTS_REQUEST, USER_PRODUCTS_SUCCESS, USER_PRODUCTS_FAIL,
  USER_FEEDBACKS_REQUEST, USER_FEEDBACKS_SUCCESS, USER_FEEDBACKS_FAIL
} from "../constants/userConstants";

export const userProfileReducer = (state = {user: {}}, action) => {
  switch(action.type) {
    case USER_PROFILE_REQUEST:
      return {loading: true, ...state}
    case USER_PROFILE_SUCCESS:
      return {loading: false, user: action.payload}
    case USER_PROFILE_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state;
  }
}

export const userProductsReducer = (state = {products: []}, action) => {
  switch(action.type) {
    case USER_PRODUCTS_REQUEST:
      return {loading: true, ...state}
    case USER_PRODUCTS_SUCCESS:
      return {loading: false, products: action.payload}
    case USER_PRODUCTS_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state;
  }
}

export const userFeedbacksReducer = (state = {feedbacks: []}, action) => {
  switch(action.type) {
    case USER_FEEDBACKS_REQUEST:
      return {loading: true, ...state}
    case USER_FEEDBACKS_SUCCESS:
      return {loading: false, feedbacks: action.payload}
    case USER_FEEDBACKS_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state;
  }
}