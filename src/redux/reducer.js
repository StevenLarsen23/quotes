import axios from "axios";

const initialState = {
  quotes: {},
};

const ADD_QUOTE = "ADD_QUOTE";

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

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_QUOTE + "_PENDING":
      return { ...state };
    case ADD_QUOTE + "_REJECTED":
      return { ...state };
    case ADD_QUOTE + "_FULFILLED":
      return { ...state, quotes: payload };
    default:
      return { state };
  }
}
