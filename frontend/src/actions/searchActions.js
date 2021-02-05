import {
  SEARCH_PRODUCTS_REQUEST, SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_FAIL,
  SEARCH_USERS_REQUEST, SEARCH_USERS_SUCCESS, SEARCH_USERS_FAIL,
  SEARCH_SORT_NEWEST, SEARCH_SORT_RATING, 
} from "../constants/searchConstants";
import axios from "axios";

export const productsSearch = (name) => async (dispatch, getState) => {
  try {
    dispatch({type: SEARCH_PRODUCTS_REQUEST});
    const {authLogin: {userInfo}} = getState(); //destructure UserInfo
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const {data} = await axios.get(`/api/products/search/${name}`, config);
    dispatch({type: SEARCH_PRODUCTS_SUCCESS, payload: data});
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(data));
  }catch(error) {
    dispatch({type: SEARCH_PRODUCTS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message})
  }
}

export const usersSearch = (name) => async (dispatch, getState) => {
  try {
    dispatch({type: SEARCH_USERS_REQUEST});
    const {authLogin: {userInfo}} = getState(); //destructure UserInfo
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const {data} = await axios.get(`/api/users/search/${name}`, config);
    dispatch({type: SEARCH_USERS_SUCCESS, payload: data});
    localStorage.removeItem("users");
    localStorage.setItem("users", JSON.stringify(data));
  }catch(error) {
    dispatch({type: SEARCH_USERS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message})
  }
}

//Sorting
export const sortNewest = (products) => (dispatch) => {
  const updatedProducts = products.sort((a,b) => {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  })
  console.log(updatedProducts);
  dispatch({type: SEARCH_SORT_NEWEST, payload: updatedProducts});
}

export const sortRating = (products) => (dispatch) => {
  const updatedProducts = products.sort((a,b) => {
    return b.seller.ratings - a.seller.ratings;
  })
  console.log(updatedProducts);
  dispatch({type: SEARCH_SORT_RATING, payload: updatedProducts});
}

// if(sortType === "seller-stars") {
//   products.sort((a,b)=>{
//     return b.seller.ratings - a.seller.ratings;
//   })
// }else if(sortType === "newest"){
//   products.sort((a,b)=>{
//     return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
//   })
// }