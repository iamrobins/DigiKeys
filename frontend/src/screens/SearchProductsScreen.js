import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./styles.screens/SearchProductsScreen.css";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {sortNewest, sortRating} from "../actions/searchActions";

const SearchProductsScreen = () => {
  const searchProducts = useSelector(state => state.searchProducts);
  const {loading, products, error} = searchProducts;

  const [sortType, setSortType] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  const dispatch = useDispatch();
  useEffect(() => {
    if(sortType === "newest") {
    dispatch(sortNewest(products));
  }else if(sortType === "seller-stars") {
      dispatch(sortRating(products));
    }
  }, [sortType, products, dispatch]);

  return (
    <>
      <Navbar />
      <div id="search-products-screen">
        <div className="container">
          {loading ? <p>Loading...</p> : error ? <p>No Products Found</p> : (
          <>
            <div className="search-products-screen__settings">
              <div className="settings-sort">
                <label htmlFor="sort">Sort </label>
                <select name="sort" value={sortType} onChange={e => setSortType(e.target.value)}>
                  <option value="newest" defaultValue>Newest</option>
                  <option value="seller-stars">Seller Stars</option>
                </select>
              </div>
              <div className="settings-filter">
                <label htmlFor="filter">Filters </label>
                <select name="filter" value={filterType} onChange={e => setFilterType(e.target.value)}>
                  <option value="all" defaultValue>All</option>
                  <option value="softwares">Softwares</option>
                  <option value="games">Games</option>
                </select>
              </div>
            </div>
            <div className="search-products-screen__results">
              {products
              .filter(product => filterType!=="all" ? product.category === filterType : product)
              .map(product => (
                <div className="search-result-product" key={product._id}>
                  <div>
                    <Link to={`/product/${product._id}`}><img src={product.image} alt={product.name}/></Link>
                  </div>
                  <p>Name: <Link to={`/product/${product._id}`}>{product.name}</Link></p>
                  <p>Seller: <Link to={`/${product.seller.name}`}>{product.seller.name}</Link></p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p>Category: {product.category}</p>
                  <p>Ratings: <i className="fas fa-star"></i> {product.seller.ratings}</p>
                </div>
              ))}
            </div>
          </>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchProductsScreen;