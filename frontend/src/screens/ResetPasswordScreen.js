import React, {useState} from "react";
import "./styles.screens/RegisterScreen.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../actions/authActions";

const ResetPassword = ({match}) => {
  const resetToken = match.params.resetToken;
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [warning, setWaring] = useState("");
  const dispatch = useDispatch();
  const authResetPassword = useSelector(state => state.authResetPassword);
  const {loading, success, error} = authResetPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== repeatPassword) {
      setWaring("Password does not match");
    } else {
      setWaring("");
      dispatch(resetPassword(resetToken, password));
    }
  }

  return (
    <div id="register">
      <div className="register-logo">
        <i className="fas fa-key"></i> DigiKeys
      </div>
      <div className="register-form">
        <h2>Reset Password</h2>
        {error && <small style={{color: "red"}}>{error}</small>}
        {warning && <small style={{color: "#fcca03"}}>{warning}</small>}
        {loading && <p style={{color: "grey", textAlign: "center"}}>Loading...</p>}
        {success && <p>Password successfully reset, <Link to="/login">login</Link></p>}
        <form onSubmit={submitHandler}>
          <label htmlFor="password">New Password</label>
          <input className="form-input" type="password" required minLength="6" value={password} onChange={e => setPassword(e.target.value)}/>
          <label htmlFor="password">Repeat New Password</label>
          <input className="form-input" type="password" required minLength="6" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
          <button type="submit" className="btn-l" disabled={loading}>Update Password</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword;