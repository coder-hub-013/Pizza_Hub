import "./dashboard.css";
import { useEffect } from "react";
import { useAdminOrderContext } from "../../../context/adminOrderContext/useAdminOrderContext";
import QuickAction from "./QuickAction";
import RecentOrders from "./RecentOrders";
import LowStockSection from "./LowStockSection";
import LoadingPage from "../../user_page/loading/LoadingPage";
import useAuth from "../../../context/authContext/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { dashboardStats, getAdminDashboardData, loading } = useAdminOrderContext();
    const {logoutFunction,error} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => { await getAdminDashboardData(); })();
    }, []);

    if (loading) {
        return <LoadingPage />
    }
    const stats = [
        {
            id: 1,
            title: "Total Orders",
            value: dashboardStats.totalOrders,
            icon: "📦",
            color: "#2563eb",
        },

        {
            id: 2,
            title: "Pending Orders",
            value: dashboardStats.pendingOrders,
            icon: "🕒",
            color: "#f59e0b",
        },

        {
            id: 3,
            title: "Delivered Orders",
            value: dashboardStats.deliveredOrders,
            icon: "✅",
            color: "#16a34a",
        },

        {
            id: 4,
            title: "Cancelled Orders",
            value: dashboardStats.cancelledOrders,
            icon: "❌",
            color: "#dc2626",
        },

        {
            id: 5,
            title: "Revenue",
            value: `₹${dashboardStats.revenue.toLocaleString("en-IN")}`,
            icon: "💰",
            color: "#9333ea",
        },

        {
            id: 6,
            title: "Users",
            value: dashboardStats.users,
            icon: "👥",
            color: "#0891b2",
        },

        {
            id: 7,
            title: "Available Pizzas",
            value: dashboardStats.availablePizzas,
            icon: "🍕",
            color: "#ea580c",
        },

        {
            id: 8,
            title: "Low Stock Items",
            value: dashboardStats.lowStockItems,
            icon: "⚠️",
            color: "#ef4444",
        },
    ];

    const revenue = {

        today: "₹8,450",

        yesterday: "₹7,650",

        week: "₹52,430",

        month: "₹2,15,860",

        total: "₹8,92,450"

    };

    const topSellingPizzas = [

        {

            id: 1,

            name: "Margherita",

            orders: 145,

            revenue: "₹36,250",

            image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=200"

        },

        {

            id: 2,

            name: "Farmhouse",

            orders: 118,

            revenue: "₹41,300",

            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200"

        },

        {

            id: 3,

            name: "Veg Supreme",

            orders: 97,

            revenue: "₹38,800",

            image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200"

        },

        {

            id: 4,

            name: "Paneer Tikka",

            orders: 85,

            revenue: "₹34,000",

            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200"

        }

    ];

    const latestUsers = [

        {

            id: 1,

            name: "Abhay Singh",

            email: "abhay@gmail.com",

            joined: "Today",

            verified: true

        },

        {

            id: 2,

            name: "Rahul Sharma",

            email: "rahul@gmail.com",

            joined: "Yesterday",

            verified: true

        },

        {

            id: 3,

            name: "Priya Verma",

            email: "priya@gmail.com",

            joined: "2 Days Ago",

            verified: false

        },

        {

            id: 4,

            name: "Aman Gupta",

            email: "aman@gmail.com",

            joined: "3 Days Ago",

            verified: true

        }

    ];

    const  handleLogout = async () => {
        const data = await logoutFunction();
        if(data?.success) {
            toast.success(data?.message || "Logout successful");
            navigate('/login');
            return
        } else {
            toast.error(error.message || "Unable to logout");
        }
    }
    return (

        <div className="admin-dashboard-dashboard">

            <div className="admin-dashboard-admin-welcome-header">

                <p className="admin-dashboard-admin-welcome-text">
                    Welcome back, Admin 👋
                </p>

                <button
                    type="button"
                    className="admin-dashboard-admin-logout-btn"
                    onClick={handleLogout}
                >
                    <span className="admin-dashboard-logout-icon">↪</span>
                    Logout
                </button>

            </div>

            <div className="admin-dashboard-stats-grid">

                {

                    stats.map((item) => (

                        <div
                            key={item.id}
                            className="admin-dashboard-stat-card"
                        >

                            <div
                                className="admin-dashboard-stat-icon"
                                style={{
                                    background: item.color
                                }}
                            >

                                {item.icon}

                            </div>

                            <div>

                                <h2>

                                    {item.value}

                                </h2>

                                <p>

                                    {item.title}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

            <QuickAction />

            <RecentOrders />

            <LowStockSection />

            <div className="admin-dashboard-revenue-section">

                <div className="admin-dashboard-section-title">

                    <h2>

                        Revenue Overview

                    </h2>

                </div>

                <div className="admin-dashboard-revenue-grid">

                    <div className="admin-dashboard-revenue-card">

                        <h3>

                            Today

                        </h3>

                        <h1>

                            {revenue.today}

                        </h1>

                    </div>

                    <div className="admin-dashboard-revenue-card">

                        <h3>

                            Yesterday

                        </h3>

                        <h1>

                            {revenue.yesterday}

                        </h1>

                    </div>

                    <div className="admin-dashboard-revenue-card">

                        <h3>

                            This Week

                        </h3>

                        <h1>

                            {revenue.week}

                        </h1>

                    </div>

                    <div className="admin-dashboard-revenue-card">

                        <h3>

                            This Month

                        </h3>

                        <h1>

                            {revenue.month}

                        </h1>

                    </div>

                    <div className="admin-dashboard-revenue-card total-card">

                        <h3>

                            Total Revenue

                        </h3>

                        <h1>

                            {revenue.total}

                        </h1>

                    </div>

                </div>

            </div>

            <div className="admin-dashboard-top-selling-section">

                <div className="admin-dashboard-section-title">

                    <h2>

                        Top Selling Pizzas

                    </h2>

                    <button

                        className="admin-dashboard-view-all-btn"

                        onClick={() => navigate("/admin/inventory/pizza")}

                    >

                        View All

                    </button>

                </div>

                <div className="admin-dashboard-pizza-grid">

                    {

                        topSellingPizzas.map((pizza) => (

                            <div

                                key={pizza.id}

                                className="admin-dashboard-pizza-card"

                            >

                                <img

                                    src={pizza.image}

                                    alt={pizza.name}

                                />

                                <div className="admin-dashboard-pizza-info">

                                    <h3>

                                        {pizza.name}

                                    </h3>

                                    <p>

                                        🍕 Orders : {pizza.orders}

                                    </p>

                                    <p>

                                        💰 Revenue : {pizza.revenue}

                                    </p>

                                    <button

                                        className="admin-dashboard-action-btn"

                                        onClick={() => navigate("/admin/pizza")}

                                    >

                                        Manage Pizza

                                    </button>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

            <div className="admin-dashboard-latest-users-section">

                <div className="admin-dashboard-section-title">

                    <h2>

                        Latest Registered Users

                    </h2>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Joined</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            latestUsers.map((user) => (

                                <tr key={user.id}>

                                    <td>

                                        {user.name}

                                    </td>

                                    <td>

                                        {user.email}

                                    </td>

                                    <td>

                                        {user.joined}

                                    </td>

                                    <td>

                                        {

                                            user.verified

                                                ?

                                                <span className="admin-dashboard-verified">

                                                    Verified

                                                </span>

                                                :

                                                <span className="admin-dashboard-not-verified">

                                                    Pending

                                                </span>

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>



        </div>

    );

}