import React from "react";
import "./styles.screens/CartScreen.css";
import Navbar from "../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";

const CartScreen = ({history}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

  const removeFromCardHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    history.push("/payment");
  }

  return (
    <>
      <Navbar />
      <div className="cart-screen-main">
        <div className="container">
          <button className="cart-screen-main__goBack" onClick={(() => history.goBack())}>Go Back</button>
          <h1><i className="fas fa-shopping-cart"></i> Shopping Cart</h1>
          {cartItems.length === 0 ? <h1 style={{textAlign: "center", color: "#a4d037", fontSize: "4rem", paddingTop: "2rem"}}>Your cart is empty</h1> : (
          <div className="cart-screen-info">
            <div className="cart-screen-info__details">
              {cartItems.map(item => (
                <div className="cart-screen-info__details__flex" key={item._id}>
                  <div className="cart-screen-info__details__image">
                    <img src={item.image} alt={item.name}/>
                  </div>
                  <p className="cart-product-name">{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>{item.category}</p>
                  <select name="qty" value={item.qty} onChange={(e) => dispatch(addToCart(item, Number(e.target.value)))}>
                    {
                          [...Array(item.countInStock).keys()].map((q) => (
                            <option key={q+1} value={q+1}>
                              {q+1}
                            </option>
                          ))
                    }
                  </select>
                  <button onClick={() => removeFromCardHandler(item._id)}><i className="fas fa-trash-alt"></i></button>
                </div>
              ))}
  

            </div>
            <div className="cart-screen-info__checkout">
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h2>
              <p>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
              <div className="product-screen-info__addToCart-btn">
                <button disabled={cartItems.length === 0} onClick={checkoutHandler}>Add To Cart</button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  )
};

export default CartScreen;