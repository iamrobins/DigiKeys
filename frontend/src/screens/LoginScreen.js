import React, {useEffect, useState} from "react";
import "./styles.screens/LoginScreen.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/authActions";

const LoginScreen = ({location, history}) => {
  const [email, setEmail] = useState("guest@guest.com");
  const [password, setPassword] = useState("123456");
  const dispatch = useDispatch();
  const authLogin = useSelector(state => state.authLogin);
  const {loading, userInfo, error, isLogined} = authLogin;

  const redirect = location.search ? location.search.split("=")[1] : userInfo ? `/${userInfo.name}` : "/";

  useEffect(() => {
    if(isLogined) {
      history.push(redirect);
    }
  }, [history, redirect, isLogined]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <div id="login">
      <div className="login-logo">
        <i className="fas fa-key"></i> DigiKeys
      </div>
      <div className="login-form">
        <h2>Sign in</h2>
        <p>Or <Link to="/register">register</Link> if you dont already have an account</p>
        {error && <small style={{color: "red"}}>{error}</small>}
        {loading && <p style={{color: "grey", textAlign: "center"}}>Loading...</p>}
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input className="form-input" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input className="form-input" type="password" required minLength="6" value={password} onChange={e => setPassword(e.target.value)} />
          <Link to="/forgotpassword">Forgot your password?</Link>
          <button type="submit" className="btn-l" disabled={loading}>Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default LoginScreen;