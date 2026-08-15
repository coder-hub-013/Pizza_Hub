import { useNavigate } from "react-router-dom";

import StatusBadge from "./StatusBadge";

export default function OrderCard({ order }) {

    const navigate = useNavigate();

    const formatDate = (date) => {

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    };


    return (

        <div className="order-card">

            <div className="order-card-header">

                <div>

                    <h3>
                        Order #{order.orderNumber}
                    </h3>

                    <p className="order-date">
                        {formatDate(order.createdAt)}
                    </p>

                </div>

                <div className="order-total">

                    ₹{order.totalAmount}

                </div>

            </div>

            <div className="order-card-body">

                <div className="order-info">

                    <span>

                        📦 {order.itemsCount} Items

                    </span>

                    <span
                        className="payment-status"
                    >
                        💳 {order.paymentStatus}
                    </span>

                </div>

                <StatusBadge status={order.status}/>

            </div>

            {/* Footer */}

            <div className="order-card-footer">

                <button
                    className="details-btn"
                    onClick={() =>
                        navigate(
                            `/my-orders/${order._id}`
                        )
                    }
                >

                    View Details

                </button>

            </div>

        </div>

    );

}