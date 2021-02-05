import React, {useState} from "react";
import "./styles.screens/PaymentScreen.css";
import Navbar from "../components/Navbar";
import {useDispatch, useSelector} from 'react-redux';
import {savePaymentMethod} from "../actions/cartActions";

const PaymentScreen = ({history}) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

  if(cartItems.length === 0) {
    history.push("/cart");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  }

  return (
    <>
    <Navbar />
    <div className="payment-screen">
      <div className="container">
      <button className="payment-screen-main__goBack" onClick={(() => history.goBack())}>Go Back</button>
        <div className="payment-screen-method">
          <h1>Payment Method</h1>
          <h2>Select Method</h2>
          <form onSubmit={submitHandler}>
          <div>
            <input type="radio" value="PayPal" checked onChange={e => setPaymentMethod(e.target.value)}/>
            <label htmlFor="paypal"><i className="fab fa-paypal"></i> Paypal or Credit Card</label>
          </div>
          <p>Comming Soon</p>
          <div>
            <input type="radio" value="stripe" disabled/>
            <label htmlFor="stripe"><i className="fab fa-cc-stripe"></i> Stripe</label>
          </div>
          <div>
            <input type="radio" value="googlepay" disabled/>
            <label htmlFor="googlepay"><i className="fab fa-google-pay"></i> Google Pay</label>
          </div>
          <div>
            <input type="radio" value="amazonpay" disabled/>
            <label htmlFor="amazon pay"><i className="fab fa-amazon-pay"></i> Amazon Pay</label>
          </div>
          <div>
            <input type="radio" value="bitcoin" disabled/>
            <label htmlFor="bitcoin"><i className="fab fa-bitcoin"></i> Bitcoin</label>
          </div>
          <button  type="submit">Place Order</button>
        </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default PaymentScreen;