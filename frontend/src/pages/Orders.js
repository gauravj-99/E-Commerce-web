import axios from "axios";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/orders/YOUR_USER_ID", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      {orders.map((order, index) => (
        <div key={index}>
          <p>Total: {order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;