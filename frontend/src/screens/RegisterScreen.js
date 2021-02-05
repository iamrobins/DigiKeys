import React, {useState, useEffect} from "react";
import "./styles.screens/RegisterScreen.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../actions/authActions";

const RegisterScreen = ({history, location}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [warning, setWaring] = useState("");
  const dispatch = useDispatch();
  const authRegister = useSelector(state => state.authRegister);
  const {loading, userInfo, error, isLogined} = authRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/login";

  useEffect(() => {
    if(isLogined){
      history.push(redirect);
    }
  }, [history, userInfo, redirect, isLogined]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== repeatPassword) {
      setWaring("Password does not match");
    } else {
      setWaring("");
      dispatch(register(name, email, password));
    }
  }
  return (
    <div id="register">
      <div className="register-logo">
        <i className="fas fa-key"></i> DigiKeys
      </div>
      <div className="register-form">
        <h2>Sign up</h2>
        <p>Or <Link to="/login">login</Link> if you already have an account</p>
        {error && <small style={{color: "red"}}>{error}</small>}
        {warning && <small style={{color: "#fcca03"}}>{warning}</small>}
        {loading && <p style={{color: "grey", textAlign: "center"}}>Loading...</p>}
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name</label>
          <input className="form-input" placeholder="Name Without Spaces" type="text" required pattern="[a-zA-Z0-9]+" minLength="3" value={name} onChange={e => setName(e.target.value)}/>
          <label htmlFor="email">Email</label>
          <input className="form-input" type="email" required value={email} onChange={e => setEmail(e.target.value)}/>
          <label htmlFor="password">Password</label>
          <input className="form-input" type="password" required minLength="6" value={password} onChange={e => setPassword(e.target.value)}/>
          <label htmlFor="password">Repeat Password</label>
          <input className="form-input" type="password" required minLength="6" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
          <button type="submit" className="btn-l">Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterScreen;