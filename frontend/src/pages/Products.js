import axios from "axios";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/cart/add",
      {
        productId: id,
        quantity: 1
      },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    alert("Added to cart");
  };

  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px",
      padding: "20px"
    },
    card: {
      border: "1px solid #ddd",
      padding: "20px",
      textAlign: "center"
    }
  };

  return (
    <div style={styles.grid}>
      {products.map((p) => (
        <div key={p._id} style={styles.card}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => addToCart(p._id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;