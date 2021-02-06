import React from "react";
import "./styles.screens/HomeScreen.css";
import {Link} from "react-router-dom";
import Footer from "../components/Footer";

const HomeScreen = () => {
  return (
    <div id="homescreen">
      <div className="homescreen-intro">
        <div className="container">
          <nav className="homescreen-nav">
            <div className="homescreen-nav__left">
              <h3 className="homescreen-nav__logo"><i className="fas fa-key"></i> DigiKeys</h3>
              
              <ul className="homescreen-nav__links">
                <li><a href="#profile-as-store">Features</a></li>
                <li><a href="#faqs">FAQs</a></li>
              </ul>
            </div>
            <ul className="homescreen-nav__auth">
              <li ><Link className="btn-sm signin" to="/login">Sign In</Link></li>
              <li><Link className="btn-sm signup" to="/register">Sign Up</Link></li>
            </ul>
          </nav>
          <header className="homescreen-header">
            <section className="homescreen-header__info">
              <h2>Sell Serial Keys Online</h2>
              <p>DigiKey is an all-in-one payment processing and e-commerce solution. Accept payments, sell digital keys from your own and more, do it all with a single platform.</p>
              {/* <li><Link className="btn-m" to="/register">Create Account</Link></li> */}
              <li><Link className="btn-m" to="/login">Guest Login</Link></li>
            </section>
            <section className="homescreen-header__image">
              {/* <img src="https://shoppy.gg/assets/img/header_image.05280df.svg" alt="header img"/> */}
              {/* <img src="https://i.postimg.cc/gcMjN189/banner.png" width="800" alt="header img"/> */}
              <img src="https://i.postimg.cc/59K3ZwrX/Simple-Isometric-Store.png" style={{marginLeft: "200px"}} alt="header img"/>
            </section>
          </header>
        </div>
      </div>

      <div className="homescreen-info container" id="profile-as-store">
        <section className="homescreen-info-section">
          <section className="homescreen-info__info">
            <h2>Use Your Profile As Store</h2>
            <p>Use your Profile link as your store and share it anywhere in the world and accepts payments instantly</p>
            <li><a className="btn-m" href="/">Create Account</a></li>
          </section>
          <section className="homescreen-info__image">
            {/* <img src="https://shoppy.gg/assets/img/header_image.05280df.svg" alt="header img"/> */}
            <img src="https://i.postimg.cc/nzWbN8xr/profile.png" width="550" style={{borderRadius: "6px"}} alt="header img"/>
          </section>
        </section>

        <section className="homescreen-info-section-r" id="virtualmoney">
          <section className="homescreen-info__image-r">
            {/* <img src="https://shoppy.gg/assets/img/header_image.05280df.svg" alt="header img"/> */}
            <img src="https://i.postimg.cc/kMHGr4vJ/cart.png" width="550" style={{borderRadius: "6px", marginBottom:"10px"}} alt="header img"/>
          </section>
          <section className="homescreen-info__info-r">
            <h2>Automated Delivery & Virtual Balance</h2>
            <p>No need to manage the distribution of buying and selling. Delivery of assets is fully automated you will get instant virtual balance for the sales.</p>
          </section>
        </section>

        <section className="homescreen-info-info" id="faqs">
          <div>
            <h1>FAQs</h1>
            <h3>Do I have to manually deliver the keys to buyers?</h3>
            <p>Distribution of Serial Keys is fully automated by the DigiKeys system</p>

            <h3>What is Virtual Balance?</h3>
            <p>Virtual Balance is the amount of money collected in your wallet by the sales</p>

            <h3>What payment gateway is used on DigiKey?</h3>
            <p>The primary mode of payments on DigiKey is PayPal</p>
          </div>
        </section>
      </div>

      <Footer />

    </div>
  )
}

export default HomeScreen;