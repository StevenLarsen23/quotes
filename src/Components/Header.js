import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
 render() {
    console.log(this.props)
    return (
      <div className='nav'>
        <ul className='nav-list'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new">+</Link>
          </li>
          <li>
            <Link to="/Auth">Login</Link>
          </li>
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (reduxState) => {
    return {
        email: reduxState.email
    }
    
  };
export default connect(mapStateToProps)(Header);
