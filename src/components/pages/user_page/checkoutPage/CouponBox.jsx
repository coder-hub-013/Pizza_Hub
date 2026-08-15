import { useState } from "react";
import "./Checkout.css";

export default function CouponBox({

    coupon,

    setCoupon

}) {

    const [input, setInput] = useState("");

    const [message, setMessage] = useState("");

    const [success, setSuccess] = useState(false);

    function applyCoupon() {

        const code = input.trim().toUpperCase();

        if (!code) {

            setMessage("Please enter a coupon.");

            setSuccess(false);

            return;

        }

        if (code === "PIZZA100") {

            setCoupon(code);

            setSuccess(true);

            setMessage("Coupon applied successfully.");

            return;

        }

        setSuccess(false);

        setMessage("Invalid coupon code.");

    }

    function removeCoupon() {

        setCoupon("");

        setInput("");

        setMessage("");

        setSuccess(false);

    }

    return (

        <section className="checkout-checkout-card">

            <h2>

                Apply Coupon

            </h2>

            {

                coupon ? (

                    <div className="checkout-coupon-success">

                        <div>

                            <strong>

                                🎉 {coupon}

                            </strong>

                            <p>

                                ₹100 discount applied.

                            </p>

                        </div>

                        <button
                            onClick={removeCoupon}
                        >

                            Remove

                        </button>

                    </div>

                ) : (

                    <>

                        <div className="checkout-coupon-box">

                            <input

                                type="text"

                                placeholder="Enter coupon code"

                                value={input}

                                onChange={(event) =>
                                    setInput(event.target.value)
                                }

                            />

                            <button

                                onClick={applyCoupon}

                            >

                                Apply

                            </button>

                        </div>

                        {

                            message && (

                                <p
                                    className={
                                        success
                                            ? "checkout-coupon-message success"
                                            : "checkout-coupon-message error"
                                    }
                                >

                                    {message}

                                </p>

                            )

                        }

                    </>

                )

            }

        </section>

    );

}