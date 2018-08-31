import axios from "axios";
import { ADD_SHIPPING, GET_SHIPPING, SHIPPING_LOADING, GET_ERRORS, CLEAR_ERRORS } from './types';


// Add Shipping
export const addShipping = (reqData, history) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/shippings', reqData)
    .then(res => history.push('/dashboard')
      // dispatch({
      //   type: ADD_SHIPPING,
      //   payload: res.data
      // })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
};


// // GET current shippings
export const getCurrentShippings = () => dispatch => {
  dispatch(setShippingLoading());
  axios.get('/api/shippings')
    .then(res => 
      dispatch({
        type: GET_SHIPPING,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_SHIPPING,
        payload: {}
      })
    )
};

// Loading when fetching shippings
export const setShippingLoading = () => {
  return {
    type: SHIPPING_LOADING
  }
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
};