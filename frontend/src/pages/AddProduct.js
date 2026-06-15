import axios from "axios";
import { useState } from "react";

function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "", category: "", stock: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login as admin");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products/add",
        {
          name: form.name,
          price: Number(form.price),
          description: form.description,
          category: form.category,
          stock: Number(form.stock || 0)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Product added");
      setForm({ name: "", price: "", description: "", category: "", stock: "" });
      window.location.href = "/products";
    } catch (err) {
      console.error(err.response || err.message || err);
      alert("Could not add product: " + (err.response?.data?.message || err.message));
    }
  };

  const styles = {
    container: { display: "flex", justifyContent: "center", padding: 20 },
    form: { width: 400, display: "flex", flexDirection: "column", gap: 10 }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required type="number" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} type="number" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
