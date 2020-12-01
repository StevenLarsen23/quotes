import { useState } from "react";

const AuthQuotes = (props) => {
  const { id, content, author, source } = props.quote;
  const [contentInput, contentSetInput] = useState(content);
  const [authorInput, authorSetInput] = useState(author);
  const [sourceInput, sourceSetInput] = useState(source);
  const [edit, setEdit] = useState(false);
  return (
    <li style={{ border: "2px solid black", margin: "5px" }}>
      {edit ? (
        <label>
          Quote:
          <input
            value={contentInput}
            style={{ width: "75vw" }}
            onChange={(e) => contentSetInput(e.target.value)}
          />
        </label>
      ) : (
        <h2>"{content}"</h2>
      )}
      <br />
      {edit ? (
        <label>
          Author/Artist:
          <input
            value={authorInput}
            style={{ width: "75vw" }}
            onChange={(e) => authorSetInput(e.target.value)}
          />
        </label>
      ) : (
        <h3>
          Author: {!author ? "Unknown" : author}
          <br />
          <br />
          Source: {!source ? "Unknown" : source}
        </h3>
      )}
      {edit ? (
        <label>
            <br/>
          Source:
          <input
            value={sourceInput}
            style={{ width: "75vw" }}
            onChange={(e) => sourceSetInput(e.target.value)}
          />
        </label>
      ) : (
        <br />
      )}
      {edit ? (
        <div>
          <button
            onClick={() => {
              authorSetInput(author);
              contentSetInput(content);
              sourceSetInput(source);
              setEdit(!edit);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.editQuote(id, authorInput, contentInput, sourceInput);
              setEdit(!edit);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Edit
        </button>
      )}
      {edit ? null : (
        <button
          onClick={() => {
            props.deleteQuote(id);
          }}
        >
          Delete
        </button>
      )}
    </li>
  );
};

export default AuthQuotes;
