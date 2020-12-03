import { useState, useEffect } from "react";
import axios from "axios";
import DashQuotes from "./DashQuotes";
import AuthQuotes from "./AuthQuotes";
import { getQuotes } from "../redux/reducer";
import { connect } from "react-redux";

const Dashboard = (props) => {
  const [setQuotes] = useState([]);

  useEffect(() => {
    props.getQuotes();
  }, [props]);

  const editQuote = async (id, author, content, source) => {
    try {
      const res = await axios.put(`/api/quotes/${id}`, {
        author,
        content,
        source,
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
  // view only quotes
  let mappedQuotes = [];
  let authMappedQuotes = [];
  let searchedQuotes = [];
  if (props.quotes) {
    mappedQuotes = props.quotes.map((quote, i) => {
      return (
        <DashQuotes 
         key={`${quote.id}-${i}`} 
         quote={quote} />);
    });
    // ability to edit and delete quotes
    authMappedQuotes = props.quotes.map((quote, i) => {
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
