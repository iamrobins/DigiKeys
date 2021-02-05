import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

//Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPassword from "./screens/ResetPasswordScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PageNotFound from "./components/PageNotFound";
import DashboardScreen from "./screens/DashboardScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import SearchProductsScreen from "./screens/SearchProductsScreen";
import SearchUsersScreen from "./screens/SearchUsersScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Auth */}
        <Route exact path="/" component={HomeScreen}/>
        <Route exact path="/login" component={LoginScreen}/>
        <Route exact path="/register" component={RegisterScreen}/>
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
        <Route exact path="/resetpassword/:resetToken" component={ResetPassword}/>
        {/* Dashboard */}
        <PrivateRoute exact path="/dashboard" component={DashboardScreen}/>
        {/* Product */}
        <Route exact path="/product/:productId" component={ProductScreen}/>
        {/* Cart, Payment and Order*/}
        <Route exact path="/cart/:productId?" component={CartScreen}/>
        <PrivateRoute exact path="/payment" component={PaymentScreen}/>
        <PrivateRoute exact path="/placeorder" component={PlaceOrderScreen}/>
        <PrivateRoute exact path="/order/:id" component={OrderScreen}/>

        {/* Search */}
        <PrivateRoute exact path="/search/products/:name" component={SearchProductsScreen}/>
        <PrivateRoute exact path="/search/users/:name" component={SearchUsersScreen}/>
        
        {/* Profile */}
        <Route exact path="/:name" component={ProfileScreen}/>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
