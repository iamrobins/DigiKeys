import React, { useEffect, useState } from "react";
import "./styles.screens/ProfileScreen.css";
import {Link} from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Feedbacks from "../components/Feedbacks";
import {useDispatch, useSelector} from "react-redux";
import {displayProfile, displayProducts, displayFeedbacks} from "../actions/userActions";

const ProfileScreen = ({match}) => {
  const [menu, setMenu] = useState("Products");
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.userProfile);
  const {loading, user, error} = userProfile;

  useEffect(() => {
    dispatch(displayProfile(match.params.name));
    if(menu === "Products") {
      dispatch(displayProducts(match.params.name));
    } else {
      dispatch(displayFeedbacks(match.params.name));
    }
  }, [dispatch, match, menu]);

  return (
    <>
      <Navbar />
      {loading ? <p>Loading</p> : error ? <PageNotFound /> : (
      <>
        <section className="profile-info">
        <div className="container">
          <div className="profile-info__image">
            <img src={user.avatar} alt={user.name}/>
          </div>
          <div className="profile-info__details">
            <p className="profile-info__name">{user.name}</p>
            <div className="profile-info__credits">
              <p><i className="fas fa-star"> {user.ratings}</i></p>
              <p>Bio: {user.bio}</p>
            </div>
            <div className="profile-info__menu">
              <Link to="/dashboard">Balance: <i className="fas fa-dollar-sign"></i> {user.balance}</Link>
              <Link to={`/${user.name}`} onClick={e => setMenu(e.target.textContent)}>Products</Link>
              <Link to={`/${user.name}`} onClick={e => setMenu(e.target.textContent)}>Feedbacks</Link>
            </div>
          </div>
        </div>
      </section>
        {menu === "Products" ? <Products /> : <Feedbacks match={match} />}
      </>
      )}
    </>
  )
}

export default ProfileScreen;