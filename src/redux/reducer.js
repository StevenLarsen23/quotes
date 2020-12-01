import axios from "axios";

const initialState = {
  quotes: {},
  user: {},
  isLoggedIn: false,
};

const ADD_QUOTE = "ADD_QUOTE";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER = "GET_USER";
const SEARCH_QUOTES = 'SEARCH_QUOTES'

export function addQuote() {
  const data = axios
    .post("/api/quotes")
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    type: ADD_QUOTE,
    payload: data,
  };
}

// export function searchQuotes() {
//   const data = axios
//   .get('/api/quotes')
//   return {
//     type: SEARCH_QUOTES,
//     payload: data
//   }
// }

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: initialState,
  };
}

export function getUser() {
  const user = axios.get("/api/user").then((res) => res.data);
  return {
    type: GET_USER,
    payload: user,
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_QUOTE + "_PENDING":
      return { ...state };
    case ADD_QUOTE + "_REJECTED":
      return { ...state };
    case ADD_QUOTE + "_FULFILLED":
      return { ...state, quotes: payload };
    case LOGIN_USER:
      return { ...state, user: payload, isLoggedIn: true };
    case LOGOUT_USER:
      return { ...state, ...payload };
    case GET_USER + "_PENDING":
      return state;
    case GET_USER + "_FULFILLED":
      return { ...state, user: payload, isLoggedIn: true };
    case GET_USER + "_REJECTED":
      return initialState;
      case SEARCH_QUOTES:
        return {...state, '': payload}
    default:
      return { state };
  }
}
