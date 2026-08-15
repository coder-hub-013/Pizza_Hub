import { useNavigate } from "react-router-dom";

export default function LowStockSection() {
    const navigate = useNavigate();
    const lowStock = [
        {
            id: 1,
            name: "Thin Crust",
            category: "Pizza Base",
            stock: 8,
            threshold: 20
        },

        {

            id: 2,

            name: "Tomato Sauce",

            category: "Sauce",

            stock: 12,

            threshold: 20

        },

        {

            id: 3,

            name: "Mozzarella Cheese",

            category: "Cheese",

            stock: 5,

            threshold: 20

        },

        {

            id: 4,

            name: "Paneer",

            category: "Vegetable",

            stock: 6,

            threshold: 20

        }

    ];
    return (

        <div className="admin-dashboard-low-stock-section">

            <div className="admin-dashboard-section-title">

                <h2>

                    Low Stock Alerts

                </h2>

                <button

                    className="admin-dashboard-view-all-btn"

                    onClick={() => navigate("/admin/inventory")}

                >

                    Manage Inventory

                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Item</th>

                        <th>Category</th>

                        <th>Current Stock</th>

                        <th>Threshold</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        lowStock.map((item) => (

                            <tr key={item.id}>

                                <td>

                                    {item.name}

                                </td>

                                <td>

                                    {item.category}

                                </td>

                                <td>

                                    {item.stock}

                                </td>

                                <td>

                                    {item.threshold}

                                </td>

                                <td>

                                    <span className="admin-dashboard-low-badge">

                                        Low Stock

                                    </span>

                                </td>

                                <td>

                                    <button

                                        className="admin-dashboard-action-btn"

                                        onClick={() => navigate("/admin/inventory")}

                                    >

                                        Manage

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