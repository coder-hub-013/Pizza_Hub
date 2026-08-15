import { useNavigate } from "react-router-dom";

export default function RecentOrders() {
    const navigate = useNavigate();
    const recentOrders = [

        {

            id: "#ORD1001",

            customer: "Abhay Singh",

            pizzas: 3,

            amount: "₹649",

            payment: "Paid",

            status: "Order Received"

        },

        {

            id: "#ORD1002",

            customer: "Rahul Sharma",

            pizzas: 2,

            amount: "₹499",

            payment: "Paid",

            status: "In Kitchen"

        },

        {

            id: "#ORD1003",

            customer: "Aman Verma",

            pizzas: 4,

            amount: "₹899",

            payment: "Paid",

            status: "Out For Delivery"

        },

        {

            id: "#ORD1004",

            customer: "Priya Sharma",

            pizzas: 1,

            amount: "₹299",

            payment: "Paid",

            status: "Delivered"

        },

        {

            id: "#ORD1005",

            customer: "Neha Gupta",

            pizzas: 2,

            amount: "₹549",

            payment: "Paid",

            status: "Cancelled"

        }

    ];
    const getStatusClass = (status) => {

        switch (status) {

            case "Order Received":

                return "received";

            case "In Kitchen":

                return "kitchen";

            case "Out For Delivery":

                return "delivery";

            case "Delivered":

                return "delivered";

            case "Cancelled":

                return "cancelled";

            default:

                return "";

        }

    };

    return (
        <div className="admin-dashboard-recent-orders">

            <div className="admin-dashboard-section-title">

                <h2>

                    Recent Orders

                </h2>

                <button
                    onClick={() => navigate("/admin/orders")}
                    className="admin-dashboard-view-all-btn"
                >

                    View All

                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Order ID</th>

                        <th>Customer</th>

                        <th>Pizzas</th>

                        <th>Amount</th>

                        <th>Payment</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        recentOrders.map((order) => (

                            <tr key={order.id}>

                                <td>

                                    {order.id}

                                </td>

                                <td>

                                    {order.customer}

                                </td>

                                <td>

                                    {order.pizzas}

                                </td>

                                <td>

                                    {order.amount}

                                </td>

                                <td>

                                    {order.payment}

                                </td>

                                <td>

                                    <span
                                        className={`status ${getStatusClass(order.status)}`}
                                    >

                                        {order.status}

                                    </span>

                                </td>

                                <td>

                                    <button

                                        className="admin-dashboard-action-btn"

                                        onClick={() => navigate(`/admin/orders/${order.id}`)}

                                    >

                                        View

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>
    )
}