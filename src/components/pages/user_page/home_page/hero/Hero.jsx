import "./hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="tag">
          🍕 Fresh • Hot • Delicious
        </span>

        <h1>
          Fresh Pizza <br />
          Delivered To <span>Your Doorstep</span>
        </h1>

        <p>
          Choose from our delicious range of pizzas or create your own custom
          pizza with your favorite base, sauce, cheese, and vegetables.
        </p>

        <div className="hero-buttons">
          <Link to="/menu" className="primary-btn">
            Order Now
          </Link>

          <Link to="/custom-pizza" className="secondary-btn">
            Build Custom Pizza
          </Link>
        </div>

        <div className="hero-stats">

          <div className="stat">
            <h2>50+</h2>
            <p>Pizza Varieties</p>
          </div>

          <div className="stat">
            <h2>1000+</h2>
            <p>Happy Customers</p>
          </div>

          <div className="stat">
            <h2>30 Min</h2>
            <p>Fast Delivery</p>
          </div>

        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://res.cloudinary.com/dw6ux0xmu/image/upload/v1786784460/pizza_image_2_eproj1.jpg"
          alt="Pizza"
        />

      </div>

    </section>
  );
}