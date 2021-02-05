import React from "react";
import "./styles.components/CheckoutSteps.css";
import {Link} from "react-router-dom";

const CheckoutSteps = ({step1, step2, step3}) => {
  return (
    <div id="checkout-steps">
      <div>
        {step1 ? (
            <Link className="active" to="/login">Sign In</Link>
        ) : <Link disabled>Sign In</Link>}
      </div>
      <div>
        {step2 ? (
            <Link className="active" to="/payment">Payment</Link>
        ) : <Link disabled>Payment</Link>}
      </div>
      <div>
        {step3 ? (
            <Link className="active" to="/placeorder">Place Order</Link>
        ) : <Link disabled>Place Order</Link>}
      </div>
    </div>
  )
}

export default CheckoutSteps;