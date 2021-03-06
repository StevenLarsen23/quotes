// import { useState } from "react";
import { connect } from "react-redux";
import { getFavorites, deleteFavorites } from "../redux/reducer";
import "./Quotes.css";

const FavQuotes = (props) => {
  const { id, content, author, source, user_id } = props.quote;

  const userId = props.userId;

  return userId !== user_id ? null : (
    <div className="quote-box" style={{ border: "2px solid black" }}>
      <div>
        <div>
          <h2 className="quote">"{content}"</h2>
          <br />
          <br />
          <br />
          <h3 className="quote-info">
            Author: {!author ? "Unknown" : author}
          </h3>
          <h3 className="quote-info">
            Source: {!source ? "Unknown" : source}
          </h3>
          <button
            className="-fav-button"
            onClick={() => {
              props.deleteFavorites(id);
              window.location.reload(false);
            }}
          >
            - Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect((reduxState) => reduxState, {
  getFavorites,
  deleteFavorites,
})(FavQuotes);
