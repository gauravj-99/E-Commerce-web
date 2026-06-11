import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={styles.nav}>
      <h2 style={{color: "white"}}>E-Shop</h2>

      <div>
        <Link to="/products" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/orders" style={styles.link}>Orders</Link>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#333"
  },
  link: {
    margin: "10px",
    color: "white",
    textDecoration: "none"
  }
};

export default Navbar;