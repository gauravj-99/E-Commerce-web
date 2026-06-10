import axios from "axios";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  // ✅ Fetch products
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  // ✅ Add to cart
  const addToCart = async (id) => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/cart/add",
      {
        userId: "PASTE_YOUR_USER_ID",
        productId: id,
        quantity: 1
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Added to cart ✅");
  };

  return (
    <div>
      <h2>Products</h2>

      {products.map(p => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>Price: {p.price}</p>

          <button onClick={() => addToCart(p._id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;