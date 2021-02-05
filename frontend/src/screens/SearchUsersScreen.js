import React from "react";
import Navbar from "../components/Navbar";
import "./styles.screens/SearchUsersScreen.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const SearchUsersScreen = () => {
  const searchUsers = useSelector(state => state.searchUsers);
  const {loading, users, error} = searchUsers;

  return (
    <>
      <Navbar />
      <div id="search-users-screen">
        <div className="container">
          {loading ? <p>Loading...</p> : error ? <p>No Users Found</p> : (
          <>
            <div className="search-users-screen__results">
              {users.map(user => (
                <div className="search-result-user" key={user._id}>
                  <div>
                    <Link to={`/${user.name}`}><img src={user.avatar} alt={user.name}/></Link>
                  </div>
                  <p>Name: <Link to={`/${user.name}`}>{user.name}</Link></p>
                  <p>Bio: {user.bio}</p>
                  <p>Ratings: <i className="fas fa-star"></i> {user.ratings}</p>
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

export default SearchUsersScreen;