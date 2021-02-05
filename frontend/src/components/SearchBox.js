import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {productsSearch, usersSearch} from "../actions/searchActions";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Products");
  const dispatch = useDispatch();
  const history = useHistory();

  const searchHandler = (e) => {
    e.preventDefault();
    if(searchType === "Products") {
      dispatch(productsSearch(searchTerm));
      history.push(`/search/products/${searchTerm}`);
    }else {
      dispatch(usersSearch(searchTerm));
      history.push(`/search/users/${searchTerm}`);
    }
  }

  return (
    <div className="navbar-main__search">
      <form onSubmit={searchHandler}>
        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search" minLength="3"/>
        <select name="search" value={searchType} onChange={e => setSearchType(e.target.value)}>
          <option value="Products" defaultValue>Products</option>
          <option value="Users">Users</option>
        </select>
        <input className="form-input navbar-main__submit" type="submit" value="Search"/>
      </form>
    </div>
  )
}

export default SearchBox;