import { useState } from "react";
import "./checkout.css";

export default function Checkout() {

    const [formData, setFormData] = useState({

        fullName: "",

        email: "",

        phone: "",

        address: "",

        city: "",

        state: "",

        pincode: ""

    });

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };

    const placeOrder = () => {

        // Later Razorpay Integration

        alert("Redirecting to Razorpay Payment...");

    };

    const subtotal = 897;

    const delivery = 40;

    const total = subtotal + delivery;

    return (

        <div className="checkout-page">

            <h1>

                Checkout

            </h1>

            <div className="checkout-container">

                <div className="shipping">

                    <h2>

                        Delivery Address

                    </h2>

                    <input
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <textarea
                        placeholder="Complete Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        placeholder="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        placeholder="Pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                    />

                </div>

                <div className="order-summary">

                    <h2>

                        Order Summary

                    </h2>

                    <div>

                        <span>

                            Cart Total

                        </span>

                        <span>

                            ₹{subtotal}

                        </span>

                    </div>

                    <div>

                        <span>

                            Delivery Charge

                        </span>

                        <span>

                            ₹{delivery}

                        </span>

                    </div>

                    <hr />

                    <div className="grand-total">

                        <span>

                            Total Amount

                        </span>

                        <span>

                            ₹{total}

                        </span>

                    </div>

                    <div className="payment">

                        <h3>

                            Payment Method

                        </h3>

                        <label>

                            <input
                                type="radio"
                                checked
                                readOnly
                            />

                            Online Payment (Razorpay)

                        </label>

                    </div>

                    <button
                        onClick={placeOrder}
                    >

                        Proceed To Payment

                    </button>

                </div>

            </div>

        </div>

    );

}