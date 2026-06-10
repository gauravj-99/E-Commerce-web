import axios from "axios";
import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/cart/YOUR_USER_ID", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setCart(res.data.products))
    .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <h3>{item.product.name}</h3>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;