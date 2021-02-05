import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL, AUTH_LOGOUT,
  AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAIL,
  AUTH_FORGOT_PASSWORD_REQUEST, AUTH_FORGOT_PASSWORD_SUCCESS, AUTH_FORGOT_PASSWORD_FAIL,
  AUTH_RESET_PASSWORD_REQUEST, AUTH_RESET_PASSWORD_SUCCESS, AUTH_RESET_PASSWORD_FAIL
} from "../constants/authConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({type: AUTH_LOGIN_REQUEST});
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }; 
    const {data} = await axios.post("/api/auth/login", {email, password}, config);

    dispatch({type: AUTH_LOGIN_SUCCESS, payload: data});
    localStorage.setItem("userInfo", JSON.stringify(data));
  }catch(error) {
    dispatch({type: AUTH_LOGIN_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message})
  }
}

export const logout = () => (dispatch) => {
  dispatch({type: AUTH_LOGOUT});
  //some other states will set to Empty as well in future
  localStorage.removeItem("userInfo");
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({type: AUTH_REGISTER_REQUEST});
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }; 
    const {data} = await axios.post("/api/auth/register", {name, email, password}, config);

    dispatch({type: AUTH_REGISTER_SUCCESS, payload: data});
    // localStorage.setItem("userInfo", JSON.stringify(data)); no need as I push user to login screen after successful registration
  }catch(error) {
    dispatch({type: AUTH_REGISTER_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message})
  }
}

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({type: AUTH_FORGOT_PASSWORD_REQUEST});
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }; 
    const {data} = await axios.post("/api/auth/forgotpassword", {email}, config);
    dispatch({type: AUTH_FORGOT_PASSWORD_SUCCESS, payload: data.success});
  }catch(error) {
    dispatch({type: AUTH_FORGOT_PASSWORD_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message})
  }
}

export const resetPassword = (resetToken, password) => async (dispatch) => {
  try {
    dispatch({type: AUTH_RESET_PASSWORD_REQUEST});
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }; 
    const {data} = await axios.put(`/api/auth/resetPassword/${resetToken}`, {password}, config);
    dispatch({type: AUTH_RESET_PASSWORD_SUCCESS, payload: data.success});
  }catch(error) {
    dispatch({type: AUTH_RESET_PASSWORD_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message})
  }
}

















































// fetch("/gta", {
//   method: "POST",
//   headers: {
//     'Content-Type': 'application/json',
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   body: JSON.stringify({email, password})
// }).then((response) => {
//   console.log(response)
//   return response.json();
// }).then(data => console.log(data))