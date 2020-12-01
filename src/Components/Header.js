import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../redux/reducer";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      displayQuotes: [],
    };
  }
  componentDidMount() {
    this.props.getUser();
  }

  handleInput = (e) => {
    this.setState({ searchInput: e.target.value });
    axios
      .get(`/api/quote?search=${e.target.value}`)
      .then((res) => {
        this.setState({ displayQuotes: res.data });
      })
      .catch((err) => console.log(err));
  };

  logout = () => {
    axios.post("/auth/logout");
    this.props.logoutUser();
  };
  render() {
    return (
      <div className="nav">
        <input placeholder={'Search'} value={this.state.searchInput} onChange={this.handleInput} />
        {!this.props.isLoggedIn ? (
          <ul className="nav-list" style={{ listStyle: "none" }}>
            <li>
              <Link to="/Auth">Login</Link>
            </li>
            <li>
              <Link to="/Auth">Register</Link>
            </li>
          </ul>
        ) : (
          <div>
            <p>{`Welcome ${this.props.user.first_name} ${this.props.user.last_name}!`}</p>
            <ul className="nav-list" style={{ listStyle: "none" }}>
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
