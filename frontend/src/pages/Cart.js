import axios from "axios";
import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",
      padding: "20px"
    },
    item: {
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px",
      width: "90%",
      maxWidth: 600,
      textAlign: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      background: "#fff"
    },
    emptyBlock: {
      border: "1px dashed #ccc",
      padding: "12px",
      borderRadius: "8px",
      width: "90%",
      maxWidth: 600,
      textAlign: "center",
      background: "#fafafa"
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log("GET /api/cart response:", res.data);
        setCart(res.data.products || []);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err.response || err.message || err);
      });
  }, []);

  const updateQuantity = async (productId, newQty) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // refresh
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.products || []);
    } catch (err) {
      console.error("Error updating quantity:", err.response || err.message || err);
    }
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete("http://localhost:5000/api/cart/remove", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId }
      });
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.products || []);
    } catch (err) {
      console.error("Error removing item:", err.response || err.message || err);
    }
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders/place",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed: " + (res.data.message || "success"));
      setCart([]);
      window.location.href = "/orders";
    } catch (err) {
      console.error("Error placing order:", err.response || err.message || err);
      alert("Could not place order");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <div style={styles.emptyBlock}>
          <p>No items in cart</p>
          <pre style={{ whiteSpace: "pre-wrap", maxWidth: 600 }}>
            {JSON.stringify(cart, null, 2)}
          </pre>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} style={styles.item}>
              <h3 style={{ margin: "0 0 8px" }}>{item.product.name}</h3>
              <p style={{ margin: "8px 0" }}>Quantity: {item.quantity}</p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8 }}>
                <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                <button onClick={() => item.quantity > 1 ? updateQuantity(item.product._id, item.quantity - 1) : removeItem(item.product._id)}>-</button>
                <button onClick={() => removeItem(item.product._id)}>Delete</button>
              </div>
            </div>
          ))}

          <div style={{ width: "90%", maxWidth: 600, textAlign: "center", marginTop: 8 }}>
            <button onClick={placeOrder} style={{ padding: "10px 16px" }}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;