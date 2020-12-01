import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../redux/reducer";
import axios from "axios";

class Header extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  logout = () => {
    axios.post("/auth/logout");
    this.props.logoutUser();
  };
  render() {
    console.log(this.props);
    return (
      <div className="nav">
        {!this.props.isLoggedIn ? (
          <ul className="nav-list" style={{ listStyle: "none" }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Auth">Login</Link>
            </li>
          </ul>
        ) : (
          <div>
            <ul className="nav-list" style={{ listStyle: "none" }}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/form">Add Quote</Link>
              </li>
              <li>
                <Link onClick={this.logout}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
};
export default connect(mapStateToProps, { logoutUser, getUser })(Header);
