import React, {useState, useEffect} from "react";
import "./styles.screens/OrderScreen.css";
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import {PayPalButton} from "react-paypal-button-v2";
import axios from "axios";
import {useDispatch ,useSelector} from 'react-redux';
import {getOrderDetails, payOrder} from '../actions/orderActions';
import {ORDER_PAY_RESET} from "../constants/orderConstants";

const OrderScreen = ({match}) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);;
  const {loading, order, error} = orderDetails; 

  const orderPay = useSelector(state => state.orderPay);;
  const {loading: loadingPay, success: successPay} = orderPay; 

  useEffect(()=>{
    const addPayPalScript = async () => {
      const {data: clientId} = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }
    if(!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch((getOrderDetails(orderId)));
    } else if(!order.isPaid) {
      if(!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  }

  return (
    <>
      <Navbar />
      <div className="placeorder-screen">
        <div className="container">
          {loading ? <p>Loading</p> : error ? <h1>Product not found</h1> : (
            <>
            <h1 id="order-screen-id">Order Id: {order._id}</h1>
            <div className="placeorder-screen-details">
              <div className="placorder-screen-details__info">
                <h2>Order Details</h2>
                <p>Name: <Link to={`/${order.user.name}`}>{order.user.name}</Link></p>
                <p>Email: {order.user.email}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Ordered At: {order.createdAt.substring(0, 10)}</p>
                <p>Status: {order.isPaid ? `Paid At: ${order.paidAt.substring(0, 10)}` : <span style={{color: "red"}}>Not Paid</span>}</p>
                <h2>Order Items</h2>
                <div className="placorder-screen-details__items">
                  {order.orderItems.length === 0 ? <h1>Your cart is empty</h1> : (
                    <>
                      {order.orderItems.map(item => (
                        <div className="placorder-screen-details__item" key={item._id}>
                          <div className="placeorder-screen-details__item__image">
                            <Link to={`/product/${item.product}`}><img src={item.image} alt={item.name}/></Link>
                          </div>
                          <div className="placeorder-screen-details__item__info">
  
                          <p><Link to={`/product/${item.product}`}>{item.name}</Link></p>
                          <p>{item.qty} x ${item.price} = ${item.qty * item.price}</p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div className="placeorder-screen-details__summary">
                <h2>Order Summary</h2>
                <div>
                    <p>Items:</p>
                    <p>${order.itemsPrice}</p>
                </div>
                <div>
                    <p>Tax:</p>
                    <p>${order.taxPrice}</p>
                </div>
                <div>
                    <p>Total:</p>
                    <p>${order.totalPrice}</p>
                </div>
                {error && <p style={{color: "red"}}>{error}</p>}
                {!order.isPaid &&
                <div className="product-screen-info__addToCart-btn order-screen__paypal-btn">
                  {loadingPay && "Loading..."}
                  {!sdkReady ? "Loading..." : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                  )}
                </div>
                }
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default OrderScreen;