import { useState, useEffect } from "react";
import axios from "axios";
import DashQuotes from "./DashQuotes";
import AuthQuotes from "./AuthQuotes";
import { getQuotes } from "../redux/reducer";
import { connect } from "react-redux";

const Dashboard = (props) => {
  const [setQuotes] = useState([]);
  const [setFavorites] = useState([]);

  useEffect(() => {
    props.getQuotes();
  }, []);

  const addFavorite = async (id) => {
    try {
    const res = axios.post(`/api/favorites/${id}`, {id});
    setFavorites(res.data);
  } catch (err) {
    console.log(err)
  }
  };

  const editQuote = async (id, author, content, source, user_id) => {
    try {
      const res = await axios.put(`/api/quotes/${id}`, {
        author,
        content,
        source,
        user_id,
      });
      setQuotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteQuote = async (id) => {
    try {
      const res = await axios.delete(`/api/quotes/${id}`);
      setQuotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const userId = props.user.id
  // const user_id = props.quotes

  // view only quotes
  let mappedQuotes = [];
  let authMappedQuotes = [];
  // console.log("session", userId)
  // console.log("quote", user_id.user_id)
  if (props.quotes) {
    let data = Array.from(props.quotes)
    mappedQuotes = data.map((quote, i) => {
      return (
        <DashQuotes 
         key={`${quote.id}-${i}`} 
         quote={quote} />);
    });
    // ability to edit and delete quotes
    authMappedQuotes = data.map((quote, i) => {
      return (
        <div>
          <h1 addFavorite={addFavorite}>+</h1>
        <AuthQuotes
          key={`${quote.id}-${i}`}
          quote={quote}
          editQuote={editQuote}
          deleteQuote={deleteQuote}
        />
        </div>
      );
    });
  }

  return (
    <div>
      {!props.isLoggedIn ? (
        <ul>
          <li style={{ listStyle: "none" }}>{mappedQuotes}</li>
        </ul>
      ) : (
        <ul>
          <li style={{ listStyle: "none" }}>{authMappedQuotes}</li>
        </ul>
      )}
    </div>
  );
};
// const mapStateToProps = (reduxState) => {
//   return reduxState;
// }

export default connect((reduxState) => reduxState, { getQuotes })(Dashboard);
