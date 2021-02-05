import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL, AUTH_LOGOUT,
  AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAIL,
  AUTH_FORGOT_PASSWORD_REQUEST, AUTH_FORGOT_PASSWORD_SUCCESS, AUTH_FORGOT_PASSWORD_FAIL,
  AUTH_RESET_PASSWORD_REQUEST, AUTH_RESET_PASSWORD_SUCCESS, AUTH_RESET_PASSWORD_FAIL
} from "../constants/authConstants";

export const authLoginReducer = (state = { userInfo: {}, isLogined: false }, action) => {
  switch(action.type) {
    case AUTH_LOGIN_REQUEST:
      return {loading: true, ...state}
    case AUTH_LOGIN_SUCCESS:
      return {loading: false, userInfo: action.payload, isLogined: true}
    case AUTH_LOGIN_FAIL:
      return {loading: false, error: action.payload}
    case AUTH_LOGOUT:
      return {userInfo: {}, isLogined: false}
    default:
      return state;
  }
}

export const authRegisterReducer = (state = { userInfo: {}, isLogined: false }, action) => {
  switch(action.type) {
    case AUTH_REGISTER_REQUEST:
      return {loading: true, ...state};
    case AUTH_REGISTER_SUCCESS:
      return {loading: false, userInfo: action.payload, isLogined: true};
    case AUTH_REGISTER_FAIL:
      return {loading: false, error: action.payload};
    case AUTH_LOGOUT:
      return {userInfo: {}, isLogined: false}
    default:
      return state;
  }
}

export const authForgotPasswordReducer = (state = {}, action) => {
  switch(action.type) {
    case AUTH_FORGOT_PASSWORD_REQUEST:
      return {loading: true};
    case AUTH_FORGOT_PASSWORD_SUCCESS:
      return {loading: false, success: action.payload}; //In this boolean there's nothing but boleean only
    case AUTH_FORGOT_PASSWORD_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

export const authResetPasswordReducer = (state = {}, action) => {
  switch(action.type) {
    case AUTH_RESET_PASSWORD_REQUEST:
      return {loading: true};
    case AUTH_RESET_PASSWORD_SUCCESS:
      return {loading: false, success: action.payload}; //In this boolean there's nothing but boleean only
    case AUTH_RESET_PASSWORD_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}