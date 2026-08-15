import "./Checkout.css";

export default function OrderSummary({
    cartItems,
    subtotal,
    delivery,
    gst,
    discount,
    total,
    children
}) {

    return (

        <aside className="checkout-order-summary">

            <div className="checkout-summary-header">
                <h2>Order Summary</h2>
                <span>
                    {cartItems.length} Items
                </span>
            </div>

            <div className="checkout-summary-items">
                {
                    cartItems.map((item) => (

                        <div
                            className="checkout-summary-item"
                            key={item.cartId}
                        >

                            <img
                                src={item.image}
                                alt={item.type === "custom" ? "Custom Pizza" : item.name}
                            />

                            <div className="checkout-summary-content">
                                <h4>
                                    {
                                        item.type === "custom"
                                            ? "Custom Pizza"
                                            : item.name
                                    }
                                </h4>
                                {
                                    item.type === "custom" && (
                                        <div className="checkout-ingredient-list">
                                            <small>
                                                Base :
                                                {item.customPizza.base.name}
                                            </small>

                                            <small>
                                                Sauce :
                                                {item.customPizza.sauce.name}
                                            </small>

                                            <small>

                                                Cheese :
                                                {item.customPizza.cheese.name}

                                            </small>

                                            <small>

                                                Veg :

                                                {

                                                    item.customPizza.vegetables
                                                        .map(v => v.name)
                                                        .join(", ")

                                                }
                                            </small>
                                        </div>
                                    )
                                }

                                <div className="checkout-summary-bottom">

                                    <span>

                                        Qty : {item.quantity}

                                    </span>

                                    <strong>
                                        ₹
                                        {
                                            item.type === "custom"
                                                ? item.subtotal
                                                : item.subtotal 
                                        }
                                    </strong>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="checkout-delivery-time">

                🚚 Estimated Delivery

                <strong>

                    30 - 40 mins

                </strong>

            </div>

            <hr />

            <div className="checkout-price-details">

                <div className="checkout-price-row">

                    <span>

                        Item Total

                    </span>

                    <span>

                        ₹{subtotal}

                    </span>

                </div>

                <div className="checkout-price-row">

                    <span>

                        Delivery

                    </span>

                    <span>

                        {

                            delivery === 0

                                ? "FREE"

                                : `₹${delivery}`

                        }

                    </span>

                </div>

                <div className="checkout-price-row">

                    <span>

                        GST (5%)

                    </span>

                    <span>

                        ₹{gst}

                    </span>

                </div>

                {

                    discount > 0 && (

                        <div className="checkout-price-row discount">

                            <span>

                                Discount

                            </span>

                            <span>

                                -₹{discount}

                            </span>

                        </div>

                    )

                }

            </div>

            <hr />

            <div className="checkout-grand-total">

                <span>

                    Total

                </span>

                <span>

                    ₹{total}

                </span>

            </div>

            <div className="checkout-secure-payment">

                🔒 Secure payment powered by Razorpay

            </div>

            {children}

        </aside>

    );

}