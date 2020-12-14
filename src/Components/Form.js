import { useState } from "react";
import { connect } from "react-redux";
import { addQuote} from "../redux/reducer";
import { Link, withRouter } from "react-router-dom";
import './Form.css'

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
    className='form'
      onSubmit={(e) => e.preventDefault()}
    >
      <label className='input-label'>
        Quote:{" "}
        <input
        className='input-box'
          value={contentInput}
          type="text"
          onChange={(e) => contentSetInput(e.target.value)}
        />
      </label>
      <br />
      <label className='input-label'>
        Author:{" "}
        <input
        className='input-box'
          value={authorInput}
          type="text"
          onChange={(e) => authorSetInput(e.target.value)}
        />
      </label>
      <br />
      <label className='input-label'>
        Source:{" "}
        <input
        className='input-box'
          value={sourceInput}
          type="text"
          onChange={(e) => sourceSetInput(e.target.value)}
        />
      </label>
      <br />
      <button
      className='form-btn'
        onClick={() => {
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
      <button className='form-btn'>
        <Link to='/' style={{textDecoration: "none", color: "black" }}>
        Cancel
        </Link>
      </button>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default withRouter(connect(mapStateToProps, { addQuote })(Form));
