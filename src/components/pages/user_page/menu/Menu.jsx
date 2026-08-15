import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import { usePizza } from "../../../context/pizzaContext/usePizza";

export default function Menu() {

  const { fetchHomePizzas, menuPizzas } = usePizza();

  useEffect(() => {
    (async () => { await fetchHomePizzas(); })();
  }, []);

  const [search, setSearch] = useState("");

  const filtered = menuPizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="menu-page">

      <div className="menu-header">

        <h1>Our Pizza Menu</h1>

        <p>
          Choose your favourite pizza or build your own custom pizza.
        </p>

        <input
          type="text"
          placeholder="Search pizza..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="pizza-grid">

        {filtered.length > 0 ? filtered.map((pizza) => (

          <div className="pizza-card" key={pizza._id}>

            <img
              src={pizza.image}
              alt={pizza.name}
            />

            <div className="pizza-body">

              <h3>{pizza.name}</h3>

              <p>{pizza.description}</p>

              <div className="bottom">

                <span className="price">
                  ₹{pizza.price}
                </span>

                <Link to={`/pizza/${pizza._id}`}>
                  View
                </Link>

              </div>

            </div>

          </div>

        )) : 
          <div className="no-pizza">
            <h3>🍕 No Pizzas Found</h3>
            <p>We couldn't find any pizzas matching your search.</p>
          </div>
        }

      </div>

    </div>
  );
}