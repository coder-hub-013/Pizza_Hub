import {  useNavigate } from "react-router-dom";
import "./cart.css";
import { useCart } from "../../../context/cart/useCart";

export default function Cart() {

    const navigate = useNavigate();
    const { cartItems, subtotal, increaseQuantity, decreaseQuantity, handleSelectItem, selectedCartItemIds } = useCart();
    const deliveryCharge = 0;
    const total = subtotal + deliveryCharge;
    const handleCheckout = () => {

        if (selectedCartItemIds.length === 0) {
            return;
        }

        navigate("/checkout");
    };

    return (

        <div className="cart-page">
            <h1>Shopping Cart</h1>
            {cartItems.length > 0 ? <div className="cart-container">
                <div className="cart-items">
                    {
                        cartItems.map((item) => (
                            <div
                                className="cart-card"
                                key={item.cartId}
                            >

                                <div className="select-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedCartItemIds.includes(item.cartId)}
                                        onChange={() => handleSelectItem(item.cartId)}
                                    />
                                </div>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div className="details">
                                    <h3>
                                        {item.name}
                                    </h3>
                                    <p>
                                        ₹{item.price}
                                    </p>
                                    {
                                        item.type === "custom" && (
                                            <>
                                                <small>
                                                    Base :
                                                    {" "}
                                                    {item.customPizza.base.name}

                                                </small>
                                                <br />
                                                <small>
                                                    Sauce :
                                                    {" "}
                                                    {item.customPizza.sauce.name}
                                                </small>
                                                <br />
                                                <small>
                                                    Cheese :
                                                    {" "}
                                                    {item.customPizza.cheese.name}
                                                </small>
                                                <br />
                                                <small>
                                                    Vegetables:{item.customPizza.vegetables.map((veg) => veg.name).join(", ")}
                                                </small>
                                            </>
                                        )
                                    }
                                </div>

                                <div className="quantity">

                                    <button onClick={() => decreaseQuantity(item.cartId)}>
                                        -
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button onClick={() => increaseQuantity(item.cartId)}>
                                        +
                                    </button>

                                </div>

                                <button className="remove">
                                    Remove
                                </button>
                            </div>
                        ))
                    }
                </div>

                <div className="summary">
                    <h2>
                        Order Summary
                    </h2>
                    <div>
                        <span>
                            Subtotal
                        </span>

                        <span>
                            ₹{subtotal}
                        </span>

                    </div>

                    <div>

                        <span>

                            Delivery

                        </span>

                        <span>

                            ₹0

                        </span>

                    </div>

                    <hr />

                    <div className="grand">

                        <span>
                            Total
                        </span>

                        <span>

                            ₹{total}

                        </span>

                    </div>

                    <button
                        disabled={selectedCartItemIds.length === 0}
                        onClick={handleCheckout}
                    >
                        Proceed To Checkout
                    </button>

                </div>

            </div>
                :
                <div className="no-pizza">
                    <h3>🍕 Cart was Empty</h3>
                    <p>We couldn't find any pizzas.</p>
                </div>
            }

        </div>

    );

}