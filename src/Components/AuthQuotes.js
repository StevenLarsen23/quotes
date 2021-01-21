import { useState } from "react";
import { connect } from "react-redux";
import { addFavorites } from "../redux/reducer";
import "./Quotes.css";

const AuthQuotes = (props) => {
  const { id, content, author, source, is_private, user_id } = props.quote;
  const [contentInput, contentSetInput] = useState(content);
  const [authorInput, authorSetInput] = useState(author);
  const [sourceInput, sourceSetInput] = useState(source);
  const [isPrivateInput, isPrivateSetInput] = useState(is_private);
  const [edit, setEdit] = useState(false);
  const userId = props.user.id;

  return (
    <div className="quote-box" >
      {userId === user_id ? (
        edit ? (
          <div>
            <div className="edit-quote-box">
              <p>Quote:</p>
              <textarea
                className="edit-input"
                value={contentInput}
                onChange={(e) => contentSetInput(e.target.value)}
              />
              <p>Author:</p>
              <textarea
                className="edit-input"
                value={authorInput}
                onChange={(e) => authorSetInput(e.target.value)}
              />
              <p>Source:</p>
              <textarea
                className="edit-input"
                value={sourceInput}
                onChange={(e) => sourceSetInput(e.target.value)}
              />
              <p>Private?</p>
              <ul>
                <li>
                  <input
                    type="radio"
                    name="isPrivate"
                    value={isPrivateInput}
                    checked={props.quotes[`${id}` - 1].is_private === true}
                    onClick={(e) => isPrivateSetInput(props.quotes[`${id}` - 1].is_private === true)}
                  />
                  Yes
                  <input
                    type="radio"
                    name="isPrivate"
                    value={isPrivateInput}
                    checked={props.quotes[`${id}` - 1].is_private === false}
                    onClick={(e) => isPrivateSetInput(props.quotes[`${id}` - 1].is_private === false)}
                  />
                  No
                </li>
              </ul>
            </div>
            <div>
              <button
                className="save-button"
                onClick={() => {
                  props.editQuote(
                    id,
                    authorInput,
                    contentInput,
                    sourceInput,
                    isPrivateInput
                  );
                  setEdit(!edit);
                }}
              >
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  authorSetInput(author);
                  contentSetInput(content);
                  sourceSetInput(source);
                  isPrivateSetInput(is_private);
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
                className="edit-button"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  props.deleteQuote(id);
                }}
              >
                Delete
              </button>
              <button
                className="fav-button"
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
