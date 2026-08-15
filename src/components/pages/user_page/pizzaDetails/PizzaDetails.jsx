import { useEffect } from "react";
import "./pizzaDetails.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePizza } from "../../../context/pizzaContext/usePizza";
import { useCart } from "../../../context/cart/useCart";
import LoadingPage from "../loading/LoadingPage";

export default function PizzaDetails() {
    const { getPizzaById, loading, error } = usePizza();
    const [pizza, setPizza] = useState(null);
    const {addToCart} = useCart();
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const result = await getPizzaById(id);
            setPizza(result);
        })
            ();
    }, []);

    if (loading) {
        return <LoadingPage />
    }

    if (error || pizza == null) {
        return (
            <div className="no-pizza">
                <h3>🍕 No Pizzas Found</h3>
                <p>We couldn't find any pizzas matching your search.</p>
            </div>
        )
    }

    const handleAddTOCart = async(e) => {
        e.preventDefault();
        const cartData = {
            pizzaId:pizza._id,
            name:pizza.name,
            image:pizza.image,
            price:pizza.price,
            quantity:1,
            type: "predefined"
        }
        const result = addToCart(cartData);
        if(result.success) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }

    }

    return (

        <div className="details-page">

            <div className="details-container">

                <div className="left">

                    <img
                        src={pizza.image}
                        alt={pizza.name}
                    />

                </div>

                <div className="right">
                    <h1>{pizza.name}</h1>
                    <p>
                        {pizza.description}
                    </p>

                    <h3>Ingredients</h3>

                    <ul>

                        {pizza.vegetables.map((item, index) => (

                            <li key={index}>

                                {item.name}

                            </li>

                        ))}

                    </ul>

                    <h2>

                        ₹{pizza.price}

                    </h2>

                    <div className="buttons">

                        <button onClick={handleAddTOCart}>
                            Add To Cart
                        </button>
                    </div>

                </div>

            </div>

        </div>

    );

}