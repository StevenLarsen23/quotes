import { useEffect } from "react";
import axios from "axios";
import DashQuotes from "./DashQuotes";
import AuthQuotes from "./AuthQuotes";
import { getQuotes, setQuotes } from "../redux/reducer";
import { connect } from "react-redux";
import "./Dashboard.css";

const Dashboard = (props) => {
  useEffect(() => {
    props.getQuotes();
  }, []);

  // const addFavorite = async (id) => {
  //   try {
  //   const res = axios.post(`/api/favorites/${id}`, {id});
  //   props.setFavorites(res.data);
  // } catch (err) {
  //   console.log(err)
  // }
  // };

  const editQuote = async (id, author, content, source, user_id) => {
    try {
      const res = await axios.put(`/api/quotes/${id}`, {
        author,
        content,
        source,
        user_id,
      });
      props.setQuotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteQuote = async (id) => {
    try {
      const res = await axios.delete(`/api/quotes/${id}`);
      props.setQuotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // view only quotes
  let mappedQuotes = [];
  let authMappedQuotes = [];
  if (props.quotes) {
    let data = Array.from(props.quotes);
    mappedQuotes = data.map((quote, i) => {
      return <DashQuotes key={`${quote.id}-${i}`} quote={quote} />;
    });
    // ability to edit and delete quotes
    authMappedQuotes = data.map((quote, i) => {
      return (
        <AuthQuotes
          key={`${quote.id}-${i}`}
          quote={quote}
          editQuote={editQuote}
          deleteQuote={deleteQuote}
        />
      );
    });
  }

  return (
    <div className="dash">
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

export default connect((reduxState) => reduxState, { getQuotes, setQuotes })(
  Dashboard
);
