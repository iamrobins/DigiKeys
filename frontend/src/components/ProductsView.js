import React, {useState, useEffect} from "react";
import "./styles.components/ProductsView.css";
import axios from "axios";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import firebase from "firebase";

const ProductsView = ({setSelect, setEditProductId}) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const authLogin = useSelector(state => state.authLogin);
  const {userInfo} = authLogin;

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        setError("");
        const {data} = await axios.get(`/api/products/displayProducts/${userInfo.name}`);
        setProducts(data);
        setLoading(false);
      }catch(error) {
        setLoading(false);
        setError(error.response && error.response.data.message
          ? error.response.data.message
          : error.message);
        }
    }
    fetchProducts();
  }, [userInfo.name, products]);

  const deleteProductHandler = async (product) => {
    if(product.image.includes("firebase")) {
      let imgToDel = firebase.storage().refFromURL(product.image)
      imgToDel.delete().then(() => {
        console.log("image deleted succesfully")
      }).catch((error) => {
        console.log(error);
      })
    }
    try {
      await axios.delete(`api/products/deleteProduct/${product._id}`);
      setProducts(products.filter(p => p._id !== product._id));
    }catch(error) {
      setError(error.response && error.response.data.message
        ? error.response.data.message
        : error.message);
      }
    }

  return (
    <>
      <div id="products-view">
        <h1>Products View</h1>
        {loading ? <p>Loading...</p> : error ? <p>No Products Available</p> : (
          <>
            <div className="products-view-items">
            {products.map(product => (
              <div className="products-view-item" key={product._id}>
                <form>
                  <div>
                    <Link to={`/product/${product._id}`}><img src={product.image} alt={product.name}/></Link>
                  </div>
                  <p>Name: <Link to={`/product/${product._id}`}>{product.name}</Link></p>
                  <p>Price: ${product.price}</p>
                  <p>Date: {product.createdAt.substring(0, 10)}</p>
                  <button onClick={e => {setSelect(e.target.textContent); setEditProductId(product)}} type="submit">Edit</button>
                  {/* <Link className="edit-product-btn" to={`/product/edit/${product._id}`}>Edit</Link> */}
                  <button onClick={() => deleteProductHandler(product)}>Delete</button>
                </form>
              </div>
            ))}
            </div>
          </>
        )}
      </div>
      <div className="products-view-addproduct-btn">
        <p><a href="#addproduct" onClick={e => setSelect(e.target.textContent)}><i className="fas fa-plus-circle"></i>Add Product</a></p>
      </div>
    </>
  )
}

export default ProductsView;