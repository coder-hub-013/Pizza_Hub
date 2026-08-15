import { useEffect } from "react";
import "./featuredPizzas.css";
import { Link } from "react-router-dom";
import { usePizza } from "../../../../context/pizzaContext/usePizza";


export default function FeaturedPizzas() {
  const {fetchHomePizzas, menuPizzas} = usePizza();

  useEffect(() => {
        (async () => {await fetchHomePizzas();})();
  }, []);

  return (
    <section className="featured">
      <div className="section-title">
        <h2>Featured Pizzas</h2>
        <p>
          Choose from our delicious range of handcrafted pizzas.
        </p>
      </div>

      <div className="pizza-grid">
        {menuPizzas.map((pizza) => (
          <div className="pizza-card" key={pizza._id}>
            <img src={pizza.image} alt={pizza.name} />

            <div className="pizza-body">
              <h3>{pizza.name}</h3>

              <p>{pizza.description}</p>

              <div className="bottom">
                <span className="price">₹{pizza.price}</span>

                <Link to={`/pizza/${pizza._id}`}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="menu-btn">
        <Link to="/menu">View Full Menu</Link>
      </div>
    </section>
  );
}