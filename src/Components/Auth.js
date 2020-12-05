import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../redux/reducer";
import './Auth.css'

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      newUser: false,
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await axios.post("/auth/login", { email, password });
      this.props.loginUser(user.data);
      this.props.history.push("/");
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className='auth'>
        <div>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link>
          <h3>Login</h3>
          <form onSubmit={(e) => this.login(e)}>
            <input
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => this.changeHandler(e)}
            />
            <input
              name="password"
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => this.changeHandler(e)}
            />
            <button>Login</button>
          </form>
          <label>
            Need an Account? Click here to <Link to="/register" style={{ textDecoration: "none", color: "black" }}>Register</Link>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps, { loginUser })(Auth);
