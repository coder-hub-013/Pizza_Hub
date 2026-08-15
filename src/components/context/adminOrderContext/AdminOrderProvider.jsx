import { useState } from "react";
import AdminOrderContext from "./AdminOrderContext";
import { dashboardData, getAllOrdersForAdmin, getOrderForAdminById, updateStatus } from "./AdminOrderService";


export default function AdminOrderProvider({ children }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState('');

    const [dashboardStats, setDashboardStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0,
        revenue: 0,
        users: 0,
        availablePizzas: 0,
        lowStockItems: 0,
    });

    const getAdminDashboardData = async () => {
            try {
            setLoading(true);
            setError(null);
            const data = await dashboardData();
            setDashboardStats(data?.stats)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getAllOrdersForAdmin();
            setOrders(data?.orders)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setError(null);
        }
    };

    const fetchOrderById = async (id) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getOrderForAdminById(id);
            setOrder(data?.order)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setError(null);
        }
    };

    const updateOrderStatus = async (id, newStatus) => {
        try {
            setLoading(true);
            setError(null);

            const data = await updateStatus(id, newStatus);
            setOrder((prevOrder) => {

                if (!prevOrder) return prevOrder;

                if (prevOrder._id !== data.orderId) {
                    return prevOrder;
                }

                return {
                    ...prevOrder,
                    status: data.status,
                };
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setError(null);
        }
    };


    return (
        <AdminOrderContext.Provider
            value={{
                loading,
                error,
                orders,
                order,
                dashboardStats,

                getAdminDashboardData,
                fetchOrders,
                fetchOrderById,
                updateOrderStatus
            }}
        >
            {children}
        </AdminOrderContext.Provider>
    );
}
