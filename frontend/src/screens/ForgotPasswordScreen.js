import React, {useState} from "react";
import "./styles.screens/LoginScreen.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "../actions/authActions";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const authForgotPassword = useSelector(state => state.authForgotPassword);
  const {loading, success, error} = authForgotPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }

  return (
    <div id="login">
      <div className="login-logo">
        <i className="fas fa-key"></i> DigiKeys
      </div>
      <div className="login-form">
        <h2>Forgot Password</h2>
        <p>Or go back to <Link to="/login">signin</Link></p>
        {error && <small style={{color: "red"}}>{error}</small>}
        {loading && <p style={{color: "grey", textAlign: "center"}}>Loading...</p>}
        {success && <small style={{color: "green"}}>Password Reset Code Sent Successfully</small>}
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input className="form-input" type="email" required value={email} onChange={e => setEmail(e.target.value)}/>
          <button style={{marginTop: "1.5rem"}} type="submit" className="btn-l">Send Recovery Email</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordScreen;