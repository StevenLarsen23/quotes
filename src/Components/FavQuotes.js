import { useState } from "react";
import { connect } from "react-redux";
import {getFavorites} from '../redux/reducer'
import "./Quotes.css";

const FavQuotes = (props) => {
  const {content, author, source, user_id } = props.quote;
  const userId = props.user.id;

 

  return (
    <li className="quote-box" style={{ border: "2px solid black" }}>
      {userId !== user_id ? null : (
        <div>
          <h2 className="quote">"{content}"</h2>
          <br />
          <br />
          <br />
          <h3 className="quote-info">Author: {!author ? "Unknown" : author}</h3>
          <h3 className="quote-info">Source: {!source ? "Unknown" : source}</h3>
          <button className="func-button">- Favorites</button>
        </div>
       )} 
    </li>
  );
};

export default connect((reduxState) => reduxState, {getFavorites})(FavQuotes);
