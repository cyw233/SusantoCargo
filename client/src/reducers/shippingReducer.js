import { ADD_SHIPPING, GET_SHIPPING, GET_SHIPPINGS, SHIPPING_LOADING } from '../actions/types';

const initialState = {
  shipping: {},
  shippings: [],
  loading: false
};

export default function (state = initialState, action) {
  switch(action.type) {
    case SHIPPING_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
        loading: false
      };
    case GET_SHIPPINGS:
      return {
        ...state,
        shippings: action.payload,
        loading: false
      };
    case ADD_SHIPPING:
      return {
        ...state,
        shippings: [action.payload, ...state.shippings]
      };
    default:
      return state;
  }
}


// case GET_POSTS:
// return {
//   ...state,
//   posts: action.payload,
//   loading: false
// };
// case GET_POST:
// return {
//   ...state,
//   post: action.payload,
//   loading: false
// }
// case ADD_POST:
// return {
//   ...state,
//   posts: [action.payload, ...state.posts]
// };
// case DELETE_POST:
// return {
//   ...state,
//   posts: state.posts.filter(post => post._id !== action.payload)
// }