import React, { useEffect, useState } from "react";
// import {Link} from "react-router-dom";
import "./styles.screens/DashboardScreen.css";
import Navbar from "../components/Navbar";
import ProductsView from "../components/ProductsView";
import AddProduct from "../components/AddProduct";
import Sales from "../components/Sales";
import Orders from "../components/Orders";
import ProfileSettings from "../components/ProfileSettings";
import WalletSettings from "../components/WalletSettings";
import EditProduct from "../components/EditProduct";

const DashboardScreen = () => {
  const [select, setSelect] = useState("Products View");
  const [editProductId, setEditProductId] = useState({});

  useEffect(()=> {
    console.log(select);
  }, [select]);

  return (
    <>
      <Navbar />
      <section className="dashboard-main" id="#dashboard">
        <div className="container">
          <div className="dashboard-menu">
            <div className="dashboard-menu__products">
              <p><i className="fas fa-cubes"></i> Products</p>
              <a href="#productsview" onClick={e => setSelect(e.target.textContent)}>Products View</a>
              <a href="#addproducts" onClick={e => setSelect(e.target.textContent)}>Add Product</a> {/* Oepn two forms */}
            </div>
            <div className="dashboard-menu__transactions">
              <p><i className="fas fa-map-signs"></i> Transactions</p>
              <a href="#sales" onClick={e => setSelect(e.target.textContent)}>Sales</a>
              <a href="#orders" onClick={e => setSelect(e.target.textContent)}>Orders</a>
            </div>
            <div className="dashboard-menu__settings">
              <p><i className="fas fa-user-cog"></i> Settings</p>
              <a href="#profile-settings" onClick={e => setSelect(e.target.textContent)}>Profile</a>
              <a href="#wallet-settings" onClick={e => setSelect(e.target.textContent)}>Wallet</a>
            </div>
          </div>
          <div className="dashboard-info">
            {select === "Products View" && <ProductsView setSelect={setSelect} setEditProductId={setEditProductId}/>}
            {select === "Add Product" && <AddProduct setSelect={setSelect}/>}
            {select === "Sales" && <Sales />}
            {select === "Orders" && <Orders />}
            {select === "Profile" && <ProfileSettings setSelect={setSelect}/>}
            {select === "Wallet" && <WalletSettings />}
            {select === "Edit" && <EditProduct editProductId = {editProductId} setSelect={setSelect}/>}
          </div>
        </div>
      </section>
    </>
  )
}

export default DashboardScreen;