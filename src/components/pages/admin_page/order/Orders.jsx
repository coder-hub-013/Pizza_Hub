import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./orders.css";
import { useAdminOrderContext } from "../../../context/adminOrderContext/useAdminOrderContext";
import Loader from "../../user_page/order/Loader";

export default function Orders() {

    const { fetchOrders, orders, loading } = useAdminOrderContext();

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");

    useEffect(() => {
        (async () => { await fetchOrders(); })();
    }, []);

    const filteredOrders = orders.filter((order) => {

        const searchMatch =
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.customer.toLowerCase().includes(search.toLowerCase());


        const statusMatch =
            status === "All" || order.status === status;

        return searchMatch && statusMatch;

    });

    function getStatusClass(status) {
        switch (status) {

            case "Pending":
                return "pending";

            case "Preparing":
                return "preparing";

            case "Delivered":
                return "delivered";

            case "Out For Delivery":
                return "out-for-delivery";

            default:
                return "";

        }

    }

    if (loading) {
        return <Loader />
    }

    return (

        <div className="admin-order-ordersPage">

            <div className="admin-order-pageHeader">

                <div>

                    <h1>Orders Dashboard</h1>

                    <p>
                        Manage customer orders efficiently.
                    </p>

                </div>

            </div>

            {/* Summary */}

            <div className="admin-order-summaryCards">

                <div className="admin-order-summaryCard">

                    <h2>{orders.length}</h2>

                    <p>Total Orders</p>

                </div>

                <div className="admin-order-summaryCard pendingCard">

                    <h2>

                        {

                            orders.filter(
                                (o) => o.status === "Pending"
                            ).length

                        }

                    </h2>

                    <p>Pending</p>

                </div>

                <div className="admin-order-summaryCard preparingCard">

                    <h2>

                        {

                            orders.filter(
                                (o) => o.status === "Preparing"
                            ).length

                        }

                    </h2>

                    <p>Preparing</p>

                </div>

                <div className="admin-order-summaryCard outForDeliveryCard">

                    <h2>

                        {

                            orders.filter(
                                (o) => o.status === "Out For Delivery"
                            ).length

                        }

                    </h2>

                    <p>Out For Delivery</p>

                </div>

                <div className="admin-order-summaryCard deliveredCard">

                    <h2>

                        {

                            orders.filter(
                                (o) => o.status === "Delivered"
                            ).length

                        }

                    </h2>

                    <p>Delivered</p>

                </div>

            </div>

            {/* Filters */}

            {orders.length > 0 ? <div className="admin-order-filterCard">

                <input
                    type="text"
                    placeholder="Search Order ID or Customer..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >

                    <option>All</option>

                    <option>Pending</option>

                    <option>Preparing</option>

                    <option>Delivered</option>

                    <option>Cancelled</option>

                </select>

            </div> : <p>Nothing items</p>}

            {/* Table */}

            {filteredOrders?.length > 0 ? <div className="admin-order-tableCard">

                <table>

                    <thead>

                        <tr>

                            <th>Order ID</th>

                            <th>Customer</th>

                            <th>Items</th>

                            <th>Amount</th>

                            <th>Payment</th>

                            <th>Status</th>

                            <th>Date</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredOrders.map((order) => (

                                <tr key={order.id}>

                                    <td>{order.id}</td>

                                    <td>{order.customer}</td>

                                    <td>{order.items}</td>

                                    <td>₹ {order.amount}</td>

                                    <td>{order.payment}</td>

                                    <td>

                                        <span
                                            className={
                                                `status ${getStatusClass(order.status)}`
                                            }
                                        >

                                            {order.status}

                                        </span>

                                    </td>

                                    <td>{order.date}</td>

                                    <td>

                                        <button
                                            className="admin-order-viewBtn"
                                            onClick={() =>
                                                navigate(`/admin/orders/${order.id}`)
                                            }
                                        >

                                            View

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div> :

                <div className="admin-manage-inventory-empty-table">

                    <h2>

                        No Orders Found

                    </h2>

                    <p>

                        Try changing the search or filters.

                    </p>

                </div>
            }

        </div>

    );

}