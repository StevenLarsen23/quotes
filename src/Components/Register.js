import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../redux/reducer";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  register = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await axios.post("/auth/register", { email, password });
      this.props.loginUser(user.data);
      this.props.history.push("/");
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div>
            <Link to='/'>Home</Link>
          <h3>Register</h3>
          <form onSubmit={(e) => this.register(e)}>
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
            <button>Register</button>
          </form>
          <label>
            {" "}
            Have an Account? Click here to <Link to="/auth">Login</Link>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps, { loginUser })(Register);
