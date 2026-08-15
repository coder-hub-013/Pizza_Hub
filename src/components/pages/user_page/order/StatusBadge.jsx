export default function StatusBadge({ status }) {

    const statusConfig = {

        ORDER_RECEIVED: {
            text: "Order Received",
            icon: "📦",
            className: "received",
        },

        IN_KITCHEN: {
            text: "In Kitchen",
            icon: "👨‍🍳",
            className: "kitchen",
        },

        SENT_TO_DELIVERY: {
            text: "Sent To Delivery",
            icon: "🚚",
            className: "delivery",
        },

        DELIVERED: {
            text: "Delivered",
            icon: "✅",
            className: "delivered",
        },

    };

    const currentStatus =
        statusConfig[status] || {

            text: status,

            icon: "❓",

            className: "default",

        };

    return (

        <span
            className={`status-badge ${currentStatus.className}`}
        >

            <span className="status-icon">

                {currentStatus.icon}

            </span>

            <span>

                {currentStatus.text}

            </span>

        </span>

    );

}