import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addQuote } from "../redux/reducer";

const Form = (props) => {
  useEffect(() => {
    props.addQuote();
  }, [{}]);

  const [quote, setQuote] = useState({
    author: "",
    content: "",
    source: "",
  });

  const [contentInput, contentSetInput] = useState(quote.content);
  const [authorInput, authorSetInput] = useState(quote.author);
  const [sourceInput, sourceSetInput] = useState(quote.source);
  return (
    <form
      style={{ border: "2px solid black", padding: "20px" /*, width: '50vw'*/ }}
    >
      <label>
        Quote:{" "}
        <input
          value={contentInput}
          type="text"
          onChange={(e) => contentSetInput(e.target.value)}
        />
      </label>
      <label>
        Author/Artist:{" "}
        <input
          value={authorInput}
          type="text"
          onChange={(e) => authorSetInput(e.target.value)}
        />
      </label>
      <label>
        Source:{" "}
        <input
          value={sourceInput}
          type="text"
          onChange={(e) => sourceSetInput(e.target.value)}
        />
      </label>
      <button>Add</button>
      <button>Cancel</button>
    </form>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps, { addQuote })(Form);
