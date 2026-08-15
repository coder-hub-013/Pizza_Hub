import "./inventoryTable.css";

export default function InventoryTable({

    inventory,

    openUpdateModal

}) {

    const getStatus = (item) => {

        if (item.stock === 0) {

            return "Out Of Stock";

        }

        if (item.stock <= item.threshold) {

            return "Low Stock";

        }

        return "Available";

    };

    const getStatusClass = (item) => {

        if (item.stock === 0) {

            return "out-stock";

        }

        if (item.stock <= item.threshold) {

            return "low-stock";

        }

        return "available-stock";

    };

    if (inventory.length === 0) {

        return (

            <div className="admin-manage-inventory-empty-table">

                <h2>

                    No Inventory Found

                </h2>

                <p>

                    Try changing the search or filters.

                </p>

            </div>

        );

    }

    return (

        <div className="admin-manage-inventory-inventory-table-container">
            <table className="admin-manage-inventory-inventory-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Threshold</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>
                    {
                        inventory.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>

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
                                    ₹{item.price}
                                </td>

                                <td>
                                    <span
                                        className={`status-badge ${getStatusClass(item)}`}
                                    >
                                        {getStatus(item)}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        className="admin-manage-inventory-update-btn"
                                        onClick={() =>openUpdateModal(item)}
                                    >
                                        Update Inventory
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}