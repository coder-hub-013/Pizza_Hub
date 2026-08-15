import { Link } from "react-router-dom";

export default function EmptyOrders() {

    return (

        <section className="empty-orders">

            <div className="empty-icon">

                🍕

            </div>

            <h2>

                No Orders Yet

            </h2>

            <p>

                Looks like you haven't placed your first order.

            </p>

            <Link
                to="/menu"
                className="shop-btn"
            >

                Order Pizza

            </Link>

        </section>

    );

}