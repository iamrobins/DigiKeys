import React from "react";
import "./styles.components/Products.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const ProductCard = ({productId, name, price, stock, image}) => {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <Link to={`/product/${productId}`}>
          <img src={image} alt={name}/>
        </Link>
      </div>
      <div  className="product-card__info">
        <p><Link to={`/product/${productId}`}>{name}</Link></p>
        <div className="product-card__info__bottom">
          <p>${price}</p>
          <p>{stock}</p>
        </div>
      </div>
    </div>
  )
}

const Products = () => {
  const userProducts = useSelector(state => state.userProducts);
  const {loading, products, error} = userProducts;

  return (
    <div id="products">
      {loading ? <p>Loading</p> : error ? <h1 className="no-products">User dont have any products to sell</h1> : (
      <div className="container products-grid">
        {products.map(product => (
          <ProductCard key={product._id} productId={product._id} name={product.name} price={product.price} stock={product.countInStock } image={product.image} />
          ))}
      </div>
      )}
    </div>
  )
}

export default Products;