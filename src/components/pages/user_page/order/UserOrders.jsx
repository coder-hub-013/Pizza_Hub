import { useEffect, useMemo, useState } from "react";
import "./userOrders.css";
import EmptyOrders from "./EmptyOrders";
import OrderCard from "./OrderCard";
import Loader from "./Loader";
import { useUser } from "../../../context/user/useUser";

export default function UserOrders() {
    const {userLoading,userOrders,fetchUserOrders} = useUser();

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {
        (async () => { await fetchUserOrders(); })();
    }, []);

    const filteredOrders = useMemo(() => {

        return userOrders.filter((order) => {

            const matchSearch =
                order.orderNumber
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchStatus =
                statusFilter === "ALL"
                    ? true
                    : order.status === statusFilter;

            return matchSearch && matchStatus;

        });

    }, [userOrders, search, statusFilter]);


    if (userLoading) {
        return <Loader />;
    }

    return (

        userOrders && userOrders.length > 0 ?(<section className="my-orders">

            {/* Header */}

            <div className="orders-header">

                <div>

                    <h1>🍕 My Orders</h1>

                    <p>
                        Track all your pizza orders in one place.
                    </p>

                </div>

            </div>

            {/* Search + Filter */}

            <div className="orders-toolbar">

                <input
                    type="text"
                    placeholder="Search Order Number..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                >

                    <option value="ALL">
                        All Orders
                    </option>

                    <option value="ORDER_RECEIVED">
                        Order Received
                    </option>

                    <option value="IN_KITCHEN">
                        In Kitchen
                    </option>

                    <option value="SENT_TO_DELIVERY">
                        Sent To Delivery
                    </option>

                    <option value="DELIVERED">
                        Delivered
                    </option>

                </select>

            </div>

            {/* Empty Orders */}

            {
                filteredOrders.length === 0 && (

                    <EmptyOrders />

                )
            }

            {/* Orders */}

            <div className="orders-list">

                {

                    userOrders.map((order) => (

                        <OrderCard
                            key={order._id}
                            order={order}
                        />

                    ))

                }

            </div>

        </section>):<EmptyOrders></EmptyOrders>

    );

}