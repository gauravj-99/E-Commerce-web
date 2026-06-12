import axios from "axios";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setOrders(res.data || []))
      .catch((err) => console.error("Error fetching orders:", err.response || err.message || err));
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
            <p style={{ margin: 0 }}><strong>Order #{order._id}</strong></p>
            <p style={{ margin: 0 }}>Total: {order.totalAmount}</p>
            <p style={{ margin: 0 }}>Status: {order.status}</p>
            <div style={{ marginTop: 8 }}>
              {order.products && order.products.map((it, i) => (
                <div key={i} style={{ padding: 6, borderTop: "1px solid #f0f0f0" }}>
                  <p style={{ margin: 0 }}>{(it.product && it.product.name) || it.product}</p>
                  <p style={{ margin: 0 }}>Qty: {it.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;