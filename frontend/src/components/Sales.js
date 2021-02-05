import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Sales = () => {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const [error, setError] = useState("");
  const authLogin = useSelector(state => state.authLogin);
  const {userInfo} = authLogin;

  useEffect(() => {
    const fetchSales = async() => {
      try {
        setError("");

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          }
        };
        const {data} = await axios.get(`/api/users/sales`, config);
        setSales(data);
        setLoading(false);
      }catch(error) {
        setLoading(false);
        setError(error.response && error.response.data.message
          ? error.response.data.message
          : error.message);
        }
    }
    fetchSales();
  }, [userInfo]);

  return (
    <div id="products-view">
    <h1>Sales</h1>
    {loading ? <p>Loading...</p> : error ? <p>You don't have any sales</p> : (
      <>
        <div className="products-view-items">
        {sales.map(sale => (
          <div className="products-view-item" key={sale._id}>
            <form>
              <div>
                <Link to={`/product/${sale._id}`}><img src={sale.image} alt={sale.name}/></Link>
              </div>
              <p>Name: <Link to={`/product/${sale.productId}`}>{sale.productName}</Link></p>
              <p>Price: ${sale.price}</p>
              <p>Qty: {sale.qty}</p>
              <p>Category: {sale.category}</p>
              <p>Date: {sale.createdAt.substring(0, 10)}</p>
            </form>
          </div>
        ))}
        </div>
      </>
    )}
  </div>
  )
}

export default Sales;