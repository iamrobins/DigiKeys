import {
  USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,
  USER_PRODUCTS_REQUEST, USER_PRODUCTS_SUCCESS, USER_PRODUCTS_FAIL,
  USER_FEEDBACKS_REQUEST, USER_FEEDBACKS_SUCCESS, USER_FEEDBACKS_FAIL
} from "../constants/userConstants";
import axios from "axios";

export const displayProfile = (name) => async (dispatch) => {
  try {
    dispatch({type: USER_PROFILE_REQUEST});
    const {data} = await axios.get(`/api/users/${name}`);
    dispatch({type: USER_PROFILE_SUCCESS, payload: data});
  } catch(error) {
    dispatch({type: USER_PROFILE_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message})
  }
}

export const displayProducts = (name) => async (dispatch) => {
  try {
    dispatch({type: USER_PRODUCTS_REQUEST});
    const {data} = await axios.get(`/api/products/displayProducts/${name}`);
    dispatch({type: USER_PRODUCTS_SUCCESS, payload: data});
  } catch(error) {
    dispatch({type: USER_PRODUCTS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message})
  }
}

export const displayFeedbacks = (name) => async (dispatch) => {
  try {
    dispatch({type: USER_FEEDBACKS_REQUEST});
    const {data} = await axios.get(`/api/users/feedbacks/${name}`);
    dispatch({type: USER_FEEDBACKS_SUCCESS, payload: data});
  } catch(error) {
    dispatch({type: USER_FEEDBACKS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message})
  }
}