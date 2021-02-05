import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authLogin = useSelector(state => state.authLogin);
  const {isLogined} = authLogin;

  return (
    <Route 
      {...rest}
      render={(props) => isLogined ? (<Component {...props} />) : (<Redirect to="/login" />)}
    />
  )
}

export default PrivateRoute;