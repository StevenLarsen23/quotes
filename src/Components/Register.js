import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../redux/reducer";
import "./Auth.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      type: "password",
    };
    this.showHide = this.showHide.bind(this);
  }

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "password" ? "input" : "password",
    });
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  register = async (e) => {
    e.preventDefault();
    const { email, password, first_name, last_name } = this.state;
    try {
      const user = await axios.post("/auth/register", {
        email,
        password,
        first_name,
        last_name,
      });
      this.props.loginUser(user.data);
      this.props.history.push("/");
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  render() {
    const { email, password, first_name, last_name } = this.state;
    return (
      <div className="auth">
        <div>
          <Link
            to="/"
            className="home-btn"
          >
            Home
          </Link>
          <h3 className="name">Register</h3>
          <form onSubmit={(e) => this.register(e)}>
            <div>
              <input
                className="input"
                name="first_name"
                value={first_name}
                placeholder="First Name"
                onChange={(e) => this.changeHandler(e)}
              />
            </div>
            <div>
              <input
                className="input"
                name="last_name"
                value={last_name}
                placeholder="Last Name"
                onChange={(e) => this.changeHandler(e)}
              />
            </div>
            <div>
              <input
                className="input"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => this.changeHandler(e)}
              />
            </div>
            <div>
              <input
                className="input"
                id='password'
                name="password"
                type={this.state.type}
                value={password}
                placeholder="password"
                onChange={(e) => this.changeHandler(e)}
              />
              <span className="password__show" onClick={this.showHide}>
                {this.state.type === "input" ? "Hide" : "Show"}
              </span>
              <span
                className="password__strength"
                data-score={this.state.score}
              />
            </div>
            <button className="btn">Register</button>
          </form>
          <div className="redirect">
            Have an Account? Click here to{" "}
            <Link to="/auth" className="redirect">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps, { loginUser })(Register);
