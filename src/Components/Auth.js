import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../redux/reducer";
import "./Auth.css";

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
      <div className="auth">
        <div>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "black" }}
            className="home-btn"
          >
            Home
          </Link>
          <h3 className="name">Login</h3>
          <form onSubmit={(e) => this.login(e)}>
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
                name="password"
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => this.changeHandler(e)}
              />
            </div>
            <button className="btn">Login</button>
          </form>
          <div className="redirect">
            Need an Account? Click here to{" "}
            <Link to="/register" style={{ color: "black" }}>
              Register
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

export default connect(mapStateToProps, { loginUser })(Auth);
