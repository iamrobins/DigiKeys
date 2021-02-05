import React, {useState, useEffect} from "react";
import "./styles.components/Orders.css";
import axios from "axios";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const authLogin = useSelector(state => state.authLogin);
  const {userInfo} = authLogin;

  useEffect(() => {
    const fetchOrders = async() => {
      try {
        setError("");

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          }
        };
        const {data} = await axios.get("/api/orders", config);
        setOrders(data);
        setLoading(false);
      }catch(error) {
        setLoading(false);
        setError(error.response && error.response.data.message
          ? error.response.data.message
          : error.message);
        }
    }
    fetchOrders();
  }, [userInfo]);

  return (
    <div id="products-view">
    <h1>Orders</h1>
    {loading ? <p>Loading...</p> : error ? <p>You don't have any orders</p> : (
      <>
        <div className="products-view-items">
        {orders.map(order => (
          <div className="products-view-item user-order-item" key={order._id}>
            <form>
              <Link to={`/order/${order._id}`}>Order Id: {order._id}</Link>
              <p>Total Price: ${order.totalPrice}</p>
              <p>Ordered At: {order.createdAt.substring(0, 10)}</p>
              <p>Status: {order.isPaid ? "Paid" : "Not Paid"}</p>
              <p>Payment Method: {order.paymentMethod}</p>
            </form>
          </div>
        ))}
        </div>
      </>
    )}
  </div>
  )
}

export default Orders;