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
    is_private: false,
    user_id: 0,

  });

  const [contentInput, contentSetInput] = useState(quote.content);
  const [authorInput, authorSetInput] = useState(quote.author);
  const [sourceInput, sourceSetInput] = useState(quote.source);
  const isPrivate = useState(quote.is_private)
  const userId = props.user.id
  
  
  return (
    <div
    className='form'
      onSubmit={(e) => e.preventDefault()}
    >
      <p className='input-label'>
        Quote:{" "}</p>
        <textarea
        className='input-box'
          value={contentInput}
          type="text"
          onChange={(e) => contentSetInput(e.target.value)}
        />
      
      <br />
      <p className='input-label'>
        Author:{" "}</p>
        <textarea
        className='input-box'
          value={authorInput}
          type="text"
          onChange={(e) => authorSetInput(e.target.value)}
        />
      
      <br />
      <p className='input-label'>
        Source:{" "}</p>
        <textarea
        className='input-box'
          value={sourceInput}
          type="text"
          onChange={(e) => sourceSetInput(e.target.value)}
        />
        <br/>
      
      {/* <input type='checkbox' id='private' name='Private'></input>
      <label for="private" className='checkbox'>Make quote private?</label> */}

      <br />
      <button
      className='form-btn'
        onClick={() => {
          props.addQuote(contentInput, authorInput, sourceInput, isPrivate, userId);
          sourceSetInput("");
          contentSetInput("");
          authorSetInput("");
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Add
        </Link>
      </button>
      <button className='form-btn'>
        <Link to='/' style={{textDecoration: "none", color: "white" }}>
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
