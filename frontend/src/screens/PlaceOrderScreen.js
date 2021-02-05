import React, {useEffect} from "react";
import "./styles.screens/PlaceOrderScreen.css";
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import {useDispatch ,useSelector} from 'react-redux';
import {createOrder} from '../actions/orderActions';
import {resetCart} from '../actions/cartActions';

const PlaceOrderScreen = ({history}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

  //Calculate Prices
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;

  const orderCreate = useSelector(state => state.orderCreate);;
  const {order, success, error} = orderCreate; 

  useEffect(()=>{
    if(success) {
      dispatch(resetCart());
      history.push(`/order/${order._id}`);
    }
  }, [order, history, success, dispatch]);


  const placeOrderHandler = () => {
    const orderItems = cart.cartItems.map(item => {
      return {
        name: item.name, image: item.image, price: item.price, qty: item.qty,
        category: item.category, product: item._id, seller: item.seller._id 
      }
    })
    dispatch(createOrder({
      orderItems,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    }))
  }

  return (
    <>
      <Navbar />
      <div className="placeorder-screen">
        <div className="container">
        <button className="product-screen-main__goBack" onClick={(() => history.goBack())}>Go Back</button>
          <div className="placeorder-screen-details">
            <div className="placorder-screen-details__info">
              <h2>Payment Method</h2>
              <p>Method: {cart.paymentMethod}</p>
              <h2>Order Items</h2>
              <div className="placorder-screen-details__items">
                {cartItems.length === 0 ? <h1>Your cart is empty</h1> : (
                  <>
                    {cartItems.map(item => (
                      <div className="placorder-screen-details__item" key={item._id}>
                        <div className="placeorder-screen-details__item__image">
                          <Link to={`/product/${item._id}`}><img src={item.image} alt={item.name}/></Link>
                        </div>
                        <div className="placeorder-screen-details__item__info">

                        <p><Link to={`/product/${item._id}`}>{item.name}</Link></p>
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
                  <p>${cart.itemsPrice}</p>
              </div>
              <div>
                  <p>Tax:</p>
                  <p>${cart.taxPrice}</p>
              </div>
              <div>
                  <p>Total:</p>
                  <p>${cart.totalPrice}</p>
              </div>
              {error && <p style={{color: "red"}}>{error}</p>}
              <div className="product-screen-info__addToCart-btn">
                <button disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceOrderScreen;