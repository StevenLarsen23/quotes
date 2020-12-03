import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser, searchQuotes } from "../redux/reducer";
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
  };

  search = () => {
    axios
      .get(`/api/search?search=${this.state.searchInput}`)
      .then((res) => {
        this.props.searchQuotes(res.data);
        this.setState({ searchInput: "" });
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
        <input value={this.state.searchInput} onChange={this.handleInput} />
        <button onClick={() => this.search()}>Search</button>
        {!this.props.isLoggedIn ? (
          <ul className="nav-list" style={{ listStyle: "none" }}>
            <li>
              <Link to="/auth">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        ) : (
          <div>
            <h2>{`${this.props.user.first_name} ${this.props.user.last_name}`}</h2>
            <ul className="nav-list" style={{ listStyle: "none" }}>
              {this.props.location.pathname === "/" ? (
                <li>
                  <Link to="/form">Add Quote</Link>
                </li>
              ) : (
                <li>
                  <Link to="/">Home</Link>
                </li>
              )}

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
export default withRouter(
  connect(mapStateToProps, { logoutUser, getUser, searchQuotes })(Header)
);
