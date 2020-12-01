import { useState, useEffect } from "react";
import axios from "axios";
import DashQuotes from "./DashQuotes";
import AuthQuotes from "./AuthQuotes";
import { connect } from "react-redux";

const Dashboard = (props) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const getQuotes = async () => {
      try {
        const quotes = await axios.get("/api/quotes");
        setQuotes(quotes.data);
      } catch (err) {
        console.log(err);
      }
    };
    getQuotes();
  }, []);

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
  // view only quotes
  const mappedQuotes = quotes.map((quote, i) => {
    return (
      <DashQuotes
        key={`${quote.id}-${i}`}
        quote={quote}
        editQuote={editQuote}
      />
    );
  });
  // ability to edit and delete quotes
  const authMappedQuotes = quotes.map((quote, i) => {
    return (
      <AuthQuotes
        key={`${quote.id}-${i}`}
        quote={quote}
        editQuote={editQuote}
      />
    );
  });

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

export default connect((reduxState) => reduxState)(Dashboard);
