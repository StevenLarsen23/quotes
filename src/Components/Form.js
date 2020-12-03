import { useState } from "react";
import { connect } from "react-redux";
import { addQuote } from "../redux/reducer";
import { Link, withRouter } from "react-router-dom";

const Form = (props) => {
  const [quote] = useState({
    author: "",
    content: "",
    source: "",
    user_id: 0,
  });

  const [contentInput, contentSetInput] = useState(quote.content);
  const [authorInput, authorSetInput] = useState(quote.author);
  const [sourceInput, sourceSetInput] = useState(quote.source);
  const userId = props.user.id
  return (
    <div
      style={{ border: "2px solid black", padding: "20px" /*, width: '50vw'*/ }}
      onSubmit={(e) => e.preventDefault()}
    >
      <label>
        Quote:{" "}
        <input
          value={contentInput}
          type="text"
          onChange={(e) => contentSetInput(e.target.value)}
        />
      </label>
      <br />
      <label>
        Author/Artist:{" "}
        <input
          value={authorInput}
          type="text"
          onChange={(e) => authorSetInput(e.target.value)}
        />
      </label>
      <br />
      <label>
        Source:{" "}
        <input
          value={sourceInput}
          type="text"
          onChange={(e) => sourceSetInput(e.target.value)}
        />
      </label>
      <br />
      <button
        onClick={(e) => {
          props.addQuote(contentInput, authorInput, sourceInput, userId);
          sourceSetInput("");
          contentSetInput("");
          authorSetInput("");
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Add
        </Link>
      </button>
      <button
        onClick={(e) => {
          sourceSetInput("");
          contentSetInput("");
          authorSetInput("");
        }}
      >
        Cancel
      </button>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default withRouter(connect(mapStateToProps, { addQuote })(Form));
