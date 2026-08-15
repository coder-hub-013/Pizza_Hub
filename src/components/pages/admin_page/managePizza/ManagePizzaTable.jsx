import "../manageInventory/inventoryTable.css";

export default function ManagePizzaTable({
    pizzas,
    openUpdateModal

}) {

    const getStatus = (item) => {
        if (!item.isAvailable) {
            return "Out Of Stock";
        }
        return "Available";
    };

    const getStatusClass = (item) => {

        if (!item.isAvailable) {
            return "out-stock";
        }

        return "available-stock";

    };

    if (pizzas.length === 0) {
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

                        <th>Image</th>

                        <th>Base</th>

                        <th>Sauce</th>

                        <th>Cheese</th>

                        <th>Vegetables</th>

                        <th>Price</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        pizzas.map((item) => (

                            <tr key={item._id}>

                                <td>{item.name}</td>

                                <td>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width={70}
                                    />
                                </td>

                                <td>{item.base.name}</td>

                                <td>{item.sauce.name}</td>

                                <td>{item.cheese.name}</td>

                                <td>

                                    {
                                        item.vegetables
                                            .map(v => v.name)
                                            .join(", ")
                                    }

                                </td>

                                <td>₹{item.price}</td>

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