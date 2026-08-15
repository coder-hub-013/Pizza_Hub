export default function OrderItems({ items }) {

    return (

        <section className="order-items-card">

            <h2>

                Ordered Items

            </h2>

            {

                items.map((item) => (

                    <div
                        className="order-item"
                        key={item._id}
                    >

                        {/* Pizza Image */}

                        <div className="item-image">

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                        </div>

                        {/* Pizza Details */}

                        <div className="item-details">

                            <div className="item-header">

                                <div>

                                    <h3>

                                        {item.name}

                                    </h3>

                                    <span className="pizza-type">

                                        {

                                            item.type ===
                                            "CUSTOM"

                                                ? "🍕 Custom Pizza"

                                                : "🍕 Predefined Pizza"

                                        }

                                    </span>

                                </div>

                                <div className="item-price">

                                    ₹{item.totalPrice}

                                </div>

                            </div>

                            <p>

                                Quantity :
                                <strong>

                                    {" "}
                                    {item.quantity}

                                </strong>

                            </p>

                            <p>

                                Unit Price :
                                <strong>

                                    {" "}
                                    ₹{item.unitPrice}

                                </strong>

                            </p>

                            {

                                item.type ===
                                    "CUSTOM" && (

                                    <div className="custom-pizza">

                                        <h4>

                                            Custom Ingredients

                                        </h4>

                                        <div className="ingredient-grid">

                                            <div>

                                                <strong>

                                                    Base

                                                </strong>

                                                <p>

                                                    {

                                                        item
                                                            .customPizza
                                                            .base
                                                            ?.name

                                                    }

                                                </p>

                                            </div>

                                            <div>

                                                <strong>

                                                    Sauce

                                                </strong>

                                                <p>

                                                    {

                                                        item
                                                            .customPizza
                                                            .sauce
                                                            ?.name

                                                    }

                                                </p>

                                            </div>

                                            <div>

                                                <strong>

                                                    Cheese

                                                </strong>

                                                <p>

                                                    {

                                                        item
                                                            .customPizza
                                                            .cheese
                                                            ?.name

                                                    }

                                                </p>

                                            </div>

                                            <div>

                                                <strong>

                                                    Vegetables

                                                </strong>

                                                <ul>

                                                    {

                                                        item
                                                            .customPizza
                                                            .vegetables
                                                            .map(

                                                                (
                                                                    veg
                                                                ) => (

                                                                    <li
                                                                        key={
                                                                            veg.inventory
                                                                        }
                                                                    >

                                                                        {

                                                                            veg.name

                                                                        }

                                                                    </li>

                                                                )

                                                            )

                                                    }

                                                </ul>

                                            </div>

                                        </div>

                                    </div>

                                )

                            }

                        </div>

                    </div>

                ))

            }

        </section>

    );

}