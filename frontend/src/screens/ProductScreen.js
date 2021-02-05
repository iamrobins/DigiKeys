import React, { useEffect, useState } from "react";
import "./styles.screens/ProductScreen.css";
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../actions/productActions";
import {addToCart} from "../actions/cartActions";

const ProductScreen = ({history, match}) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const {loading, product, error} = productDetails;
  
  const authLogin = useSelector(state => state.authLogin);
  const {userInfo} = authLogin;

  useEffect(()=> {
    dispatch(listProductDetails(match.params.productId));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(product, qty));
    history.push("/cart");
  }

  return (
    <>
      <Navbar />
      {loading ? <p>Loading</p> : error ? <h1>Product not found</h1> : (
      <div className="product-screen-main">
        <div className="container">
          <button className="product-screen-main__goBack" onClick={(() => history.goBack())}>Go Back</button>
            <div className="product-screen-info">
              <div className="product-screen-info__image">
                {/* <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=2000&hei=2000&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1591634795000" alt="product name"/> */}
                <img src={product.image} alt={product.name}/>
              </div>
              <div className="product-screen-info__details">
                <h1>{product.name}</h1>
                <p>Seller: <Link to={`/${product.seller.name}`}>{product.seller.name}</Link></p>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Description: {product.description}</p>
              </div>
              <div className="product-screen-info__addToCart">
                <div className="product-screen-info__addToCart-price">
                  <p>Price:</p>
                  <p>${product.price.toFixed(2)}</p>
                </div>
                <div className="product-screen-info__addToCart-status">
                  <p>Status:</p>
                  <p>{product.countInStock ? "In Stock" : "Out Of Stock"}</p>
                </div>
                <div className={userInfo && userInfo.name === product.seller.name ? "product-screen-info__addToCart-qty" : ""}> {/* Toggling class so seller can buy his own products */}
                  <p>Qty:</p>
                  {userInfo && userInfo.name === product.seller.name ? <p>{product.countInStock}</p> : (
                    <select name="qty" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                    {
                      [...Array(product.countInStock).keys()].map((q) => (
                        <option key={q+1} value={q+1}>
                          {q+1}
                        </option>
                      ))
                    }
                  </select>
                  )} 
                </div>
                {userInfo && userInfo.name === product.seller.name ? "" : (
                  <div className="product-screen-info__addToCart-btn">
                    <button disabled={product.countInStock === 0} onClick={addToCartHandler}>Add To Cart</button>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
      )}
    </>
  )
}

export default ProductScreen;