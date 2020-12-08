import axios from "axios";

const initialState = {
  quotes: [],
  favoriteQuotes: [],
  user: {},
  isLoggedIn: false,
};

const ADD_QUOTE = "ADD_QUOTE";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER = "GET_USER";
const SEARCH_QUOTES = "SEARCH_QUOTES";
const GET_QUOTES = "GET_QUOTES";
const SET_QUOTES = "SET_QUOTES";
const GET_FAVORITES = "GET_FAVORITES";
const ADD_FAVORITES = "ADD_FAVORITES";
const SEARCH_FAVORITES = "SEARCH_FAVORITES";

export function getQuotes() {
  const data = axios
    .get("/api/quotes")
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    type: GET_QUOTES,
    payload: data,
  };
}

export function getFavorites() {
  const data = axios
    .get("/api/favorites")
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    type: GET_FAVORITES,
    payload: data,
  };
}

export function setQuotes(quotes) {
  return {
    type: SET_QUOTES,
    payload: quotes,
  };
}

export function addQuote(content, author, source) {
  const data = axios
    .post("/api/quotes", { author, content, source })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    type: ADD_QUOTE,
    payload: data,
  };
}

export function addFavorites(quote_id, user_id) {
  const data = axios
    .post("/api/favorites", { quote_id, user_id })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    type: ADD_FAVORITES,
    payload: data,
  };
}

export function searchQuotes(data) {
  return {
    type: SEARCH_QUOTES,
    payload: data,
  };
}

export function searchFavorites(data) {
  return {
    type: SEARCH_FAVORITES,
    payload: data,
  };
}

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
    case GET_QUOTES + "_PENDING":
      return { ...state };
    case GET_QUOTES + "_REJECTED":
      return { ...state };
    case GET_QUOTES + "_FULFILLED":
      return { ...state, quotes: payload };
    case GET_FAVORITES + "_PENDING":
      return { ...state };
    case GET_FAVORITES + "_REJECTED":
      return { ...state };
    case GET_FAVORITES + "_FULFILLED":
      return { ...state, favoriteQuotes: payload };
    case ADD_QUOTE + "_PENDING":
      return { ...state };
    case ADD_QUOTE + "_REJECTED":
      return { ...state };
    case ADD_QUOTE + "_FULFILLED":
      return { ...state, quotes: payload };
    case ADD_FAVORITES + "_PENDING":
      return { ...state };
    case ADD_FAVORITES + "_REJECTED":
      return { ...state };
    case ADD_FAVORITES + "_FULFILLED":
      return { ...state, quotes: payload };
    case SET_QUOTES:
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
      return { ...state, quotes: payload };
    case SEARCH_FAVORITES:
      return { ...state, quotes: payload };
    default:
      return { state };
  }
}
