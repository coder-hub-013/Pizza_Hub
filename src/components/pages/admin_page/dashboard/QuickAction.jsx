import { useNavigate } from "react-router-dom";

export default function QuickAction() {
    const navigate = useNavigate();
    const quickActions = [

        {

            id: 1,

            title: "Add Pizza",

            description: "Create a new pizza",

            icon: "🍕",

            color: "#2563eb",

            path: "/admin/pizza/add"

        },

        {

            id: 2,

            title: "Add Inventory",

            description: "Add new inventory item",

            icon: "📦",

            color: "#16a34a",

            path: "/admin/inventory/add"

        },

        {

            id: 3,

            title: "View Orders",

            description: "Manage customer orders",

            icon: "📋",

            color: "#f59e0b",

            path: "/admin/orders"

        },

        {

            id: 4,

            title: "Manage Inventory",

            description: "Update stock",

            icon: "⚙️",

            color: "#9333ea",

            path: "/admin/inventory"

        },
        {

            id: 5,

            title: "Manage Pizza",

            description: "Update stock",

            icon: "⚙️",

            color: "#9333ea",

            path: "/admin/inventory/pizza"

        }

    ];
    return (
        <div className="admin-dashboard-quick-action-section">

            <h2>

                Quick Actions

            </h2>

            <div className="admin-dashboard-quick-grid">

                {

                    quickActions.map((item) => (

                        <div

                            key={item.id}

                            className="admin-dashboard-quick-card"

                            onClick={() => navigate(item.path)}

                        >

                            <div

                                className="admin-dashboard-quick-icon"

                                style={{

                                    background: item.color

                                }}

                            >

                                {item.icon}

                            </div>

                            <h3>

                                {item.title}

                            </h3>

                            <p>

                                {item.description}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>
    )
}