import "./inventoryStats.css";

export default function InventoryStats({ inventory }) {

    const totalItems = inventory.length;

    const availableItems = inventory.filter(
        (item) => item.stock > item.threshold
    ).length;

    const lowStockItems = inventory.filter(
        (item) =>
            item.stock > 0 &&
            item.stock <= item.threshold
    ).length;

    const outOfStockItems = inventory.filter(
        (item) => item.stock === 0
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

            <div className="admin-manage-inventory-stat-card low">

                <h3>

                    Low Stock

                </h3>

                <h1>

                    {lowStockItems}

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