import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Company Info */}
        <div className="footer-section">
          <h2>🍕 PizzaHub</h2>

          <p>
            Freshly baked pizzas made with premium ingredients.
            Build your own pizza or choose from our delicious menu.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/login">Login</Link>
        </div>

        {/* Customer */}
        <div className="footer-section">
          <h3>Customer</h3>

          <Link to="/register">Register</Link>
          <Link to="/my-orders">My Orders</Link>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>📍 Sikar, Rajasthan</p>
          <p>📞 +91 9828198727</p>
          <p>✉️ abhaysr9828@gmail.com</p>

          <div className="social-icons">

            <a href="#">
              🌐
            </a>

            <a href="#">
              📘
            </a>

            <a href="#">
              📷
            </a>

            <a href="#">
              ▶️
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} PizzaHub. All Rights Reserved.
      </div>

    </footer>
  );
}