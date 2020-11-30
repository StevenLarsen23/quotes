import { useState, useEffect } from "react";
import axios from "axios";
import DashQuotes from "./DashQuotes"
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

  const mappedQuotes = quotes.map((quote, i) => {
    return (
      <DashQuotes
        key={`${quote.id}-${i}`}
        quote={quote}
        editQuote={editQuote}
      />
    );
  });

  return (
    <div>
      <ul>
        <li style={{ listStyle: "none" }}>{mappedQuotes}</li>
      </ul>
    </div>
  );
};

export default connect((reduxState) => reduxState)(Dashboard);
