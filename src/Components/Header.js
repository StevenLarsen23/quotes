import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser, setQuotes } from "../redux/reducer";
import axios from "axios";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
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
        this.props.setQuotes(res.data);
        this.setState({ searchInput: "" });
        
      })
      .catch((err) => console.log(err));
  };
  logout = () => {
    axios.post("/auth/logout").then(() => {
      this.props.logoutUser();
      window.location.reload(false);
    });
  };

  refresh = () => {
    window.location.reload(false)
  }

  render() {
    return (
      <div>
        {this.props.location.pathname === "/form" ? null : (
          <div className="nav">
            {this.props.location.pathname ===
            `/favorites/${this.props.user.id}` ? (
              <div className="search"></div>
            ) : (
              <div className="search">
                <input
                  className="search-input"
                  value={this.state.searchInput}
                  onChange={this.handleInput}
                />
                <button className="search-button" onClick={() => this.search()}>
                  Search
                </button>
                <button className="search-button" onClick={this.refresh}>
                  Clear
                </button>
              </div>
            )}

            <div className="user">
              {!this.props.isLoggedIn ? null : (
                <h1>
                  {`${this.props.user.first_name} ${this.props.user.last_name}`}
                </h1>
              )}
            </div>

            {!this.props.isLoggedIn ? (
              <div>
                <ul className="nav-list" style={{ listStyle: "none" }}>
                  <li>
                    <Link
                      to="/auth"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <ul className="nav-list" style={{ listStyle: "none" }}>
                  {this.props.location.pathname ===
                  `/favorites/${this.props.user.id}` ? (
                    <li>
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Home
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={`/favorites/${this.props.user.id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Favorites
                      </Link>
                    </li>
                  )}
                  {!this.props.location.pathname === "/" ? (
                    <li>
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Home
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to="/form"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Add Quote
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      to="/"
                      onClick={this.logout}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
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
  connect(mapStateToProps, { logoutUser, getUser, setQuotes })(Header)
);
