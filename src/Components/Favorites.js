import { useEffect } from "react";
import axios from "axios";
import FavQuotes from "./FavQuotes";
import { getFavorites } from "../redux/reducer";
import { connect } from "react-redux";
import "./Dashboard.css";

const Favorites = (props) => {
  useEffect(() => {
    props.getFavorites();
}, []);


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

  let favMappedQuotes = [];
  if (props.quotes) {
      let data = (props.favoriteQuotes);
      favMappedQuotes = data.map((quote, i) => {
        console.log(props.favoriteQuotes[i].user_id)
        console.log(props.user.id)
      return (
        <FavQuotes
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
      <ul>
        <li style={{ listStyle: "none" }}>{favMappedQuotes}</li>
      </ul>
    </div>
  );
};

export default connect((reduxState) => reduxState, { getFavorites })(Favorites);
