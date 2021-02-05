import React from "react";
import "./styles.components/Navbar.css";
import {Link} from "react-router-dom";
import SearchBox from "./SearchBox";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../actions/authActions";

const Navbar = () => {
  const authLogin = useSelector(state => state.authLogin);
  const {userInfo ,isLogined} = authLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <nav id="navbar">
      <div className="container">
        <div className="navbar-main">
          <h3 className="navbar-main__logo"><Link to="/"><i className="fas fa-key"></i> DigiKeys</Link></h3>
          {isLogined && <SearchBox />}
          {isLogined ? (
            <ul className="navbar-main__link">
              <li><Link to={`/${userInfo.name}`}><i className="fas fa-user"></i> {userInfo.name}</Link></li>
              <li><Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link></li>
              <li><Link to="/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
              <li><Link to="/" onClick={logoutHandler}><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
            </ul>
          ) : (
            <ul className="navbar-main-guest">
              <li><Link className="btn-sm signin" to="/login">Sign In</Link></li>
              <li><Link className="btn-sm signup" to="/register">Sign Up</Link></li>
            </ul>
          )}    
        </div>
      </div>
    </nav>
  )
}

export default Navbar;