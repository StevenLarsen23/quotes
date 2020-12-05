import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser, searchQuotes } from "../redux/reducer";
import axios from "axios";
import './Header.css';

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
        {this.props.location.pathname === "/form" ? null : (
          <div className='search'>
            <input value={this.state.searchInput} onChange={this.handleInput} />
            <button onClick={() => this.search()}>Search</button>
          </div>
        )}
        <div className='user'>
          {!this.props.isLoggedIn ? null : (<h1>{`${this.props.user.first_name} ${this.props.user.last_name}`}</h1>)}
            
            </div>

        {!this.props.isLoggedIn ? (
          <div>
          <ul className="nav-list" style={{ listStyle: "none" }}>
            <li>
              <Link
                to="/auth"
                style={{ textDecoration: "none", color: "black" }}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                Register
              </Link>
            </li>
          </ul>
          </div>
        ) : (
          <div>
            <ul className="nav-list" style={{ listStyle: "none" }}>
              {this.props.location.pathname === "/" ? (
                <li>
                  <Link
                    to="/form"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Add Quote
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Home
                  </Link>
                </li>
              )}

              <li>
                <Link
                  onClick={this.logout}
                  to="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Logout
                </Link>
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
