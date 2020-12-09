import { useEffect, useState } from "react";
import axios from "axios";
import FavQuotes from "./FavQuotes";
import { getFavorites } from "../redux/reducer";
import { connect } from "react-redux";
import "./Dashboard.css";

const Favorites = (props) => {
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/favorites")
      .then((res) => setFavoriteQuotes(res.data))
      .catch((err) => console.log(err));

    props.getFavorites(favoriteQuotes);
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

  // console.log(props)
  let favMappedQuotes = [];
  if (favoriteQuotes.length) {
    favMappedQuotes = favoriteQuotes.map((quote, i) => {
      return favoriteQuotes[i].user_id === +props.match.params.userId ? (
        <FavQuotes
          key={`${quote.id}-${i}`}
          userId={+props.match.params.userId}
          quote={quote}
          editQuote={editQuote}
          deleteQuote={deleteQuote}
        />
      ) : (
        null
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
