import { useState } from "react";
import { connect } from "react-redux";
import { addFavorites } from "../redux/reducer";
import "./Quotes.css";

const AuthQuotes = (props) => {
  const { id, content, author, source, user_id } = props.quote;
  const [contentInput, contentSetInput] = useState(content);
  const [authorInput, authorSetInput] = useState(author);
  const [sourceInput, sourceSetInput] = useState(source);
  const [edit, setEdit] = useState(false);
  const userId = props.user.id;

  return (
    <div className="quote-box" style={{ border: "2px solid black" }}>
      {userId === user_id ? (
        edit ? (
          <div>
            <div>
              <label>
                Quote:
                <input
                  className="edit-input"
                  value={contentInput}
                  onChange={(e) => contentSetInput(e.target.value)}
                />
              </label>
              <label>
                Author:
                <input
                  className="edit-input"
                  value={authorInput}
                  onChange={(e) => authorSetInput(e.target.value)}
                />
              </label>
              <label>
                <br />
                Source:
                <input
                  className="edit-input"
                  value={sourceInput}
                  onChange={(e) => sourceSetInput(e.target.value)}
                />
              </label>
            </div>
            <div>
              <button
                className="edit-buttons"
                onClick={() => {
                  props.editQuote(id, authorInput, contentInput, sourceInput);
                  setEdit(!edit);
                }}
              >
                Save
              </button>
              <button
                className="edit-buttons"
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  authorSetInput(author);
                  contentSetInput(content);
                  sourceSetInput(source);
                  setEdit(!edit);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <h2 className="quote">"{content}"</h2>
              <br />
              <br />
              <h3 className="quote-info">
                Author: {!author ? "Unknown" : author}
              </h3>
              <h3 className="quote-info">
                Source: {!source ? "Unknown" : source}
              </h3>
            </div>
            <div>
              <br />
              <br />
              <button
                className="func-button"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Edit
              </button>
              <button
                className="func-button"
                onClick={() => {
                  props.deleteQuote(id);
                }}
              >
                Delete
              </button>
              <button
                className="func-button"
                onClick={() => props.addFavorites(id, userId)}
              >
                + Favorites
              </button>
            </div>
          </div>
        )
      ) : (
        <div>
          <h2 className="quote">"{content}"</h2>
          <br />
          <br />
          <h3 className="quote-info">Author: {!author ? "Unknown" : author}</h3>
          <h3 className="quote-info">Source: {!source ? "Unknown" : source}</h3>
          <br />
          <br />
          <button
            className="func-button"
            onClick={() => props.addFavorites(id, userId)}
          >
            + Favorites
          </button>
        </div>
      )}
    </div>
  );
};

export default connect((reduxState) => reduxState, { addFavorites })(
  AuthQuotes
);
