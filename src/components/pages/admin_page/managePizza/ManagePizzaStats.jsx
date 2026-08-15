import "../manageInventory/inventoryStats.css";

export default function ManagePizzaStats({ pizza }) {

    const totalItems = pizza.length;

    const availableItems = pizza.filter(
        (item) => item.isAvailable 
    ).length;

    const outOfStockItems = pizza.filter(
        (item) => !item.isAvailable
    ).length;

    return (

        <div className="admin-manage-inventory-inventory-stats">

            <div className="admin-manage-inventory-stat-card">

                <h3>

                    Total Items

                </h3>

                <h1>

                    {totalItems}

                </h1>

            </div>

            <div className="admin-manage-inventory-stat-card available">

                <h3>

                    Available

                </h3>

                <h1>

                    {availableItems}

                </h1>

            </div>

            <div className="admin-manage-inventory-stat-card out">

                <h3>

                    Out Of Stock

                </h3>

                <h1>

                    {outOfStockItems}

                </h1>

            </div>

        </div>

    );

}