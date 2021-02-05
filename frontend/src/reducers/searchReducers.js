import {
  SEARCH_PRODUCTS_REQUEST, SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_FAIL,
  SEARCH_USERS_REQUEST, SEARCH_USERS_SUCCESS, SEARCH_USERS_FAIL
} from "../constants/searchConstants";

import {
  SEARCH_SORT_NEWEST, SEARCH_SORT_RATING
} from "../constants/searchConstants";

export const searchProductsReducer = (state = {loading: true, products: []}, action) => {
  switch(action.type) {
    case SEARCH_PRODUCTS_REQUEST:
      return {loading: true, ...state};
    case SEARCH_PRODUCTS_SUCCESS:
      return {loading: false, products: action.payload};
    case SEARCH_PRODUCTS_FAIL:
      return {loading: false, error: action.payload};

    case SEARCH_SORT_NEWEST:
      return {loading: false, products: action.payload};
    case SEARCH_SORT_RATING:
      return {loading: false, products: action.payload};
      
    default:
      return state;
  }
}

export const searchUsersReducer = (state = {loading: true, users: []}, action) => {
  switch(action.type) {
    case SEARCH_USERS_REQUEST:
      return {loading: true, ...state};
    case SEARCH_USERS_SUCCESS:
      return {loading: false, users: action.payload};
    case SEARCH_USERS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}