import { useState } from "react";
import "./addInventory.css";
import { toast } from "react-toastify";
import Loader from "../../user_page/order/Loader";
import { useInventory } from "../../../context/inventoryContext/useInventory";

export default function AddInventory() {
    const { createInventory, error, loading } = useInventory();

    const [inventory, setInventory] = useState({
        name: "",
        description: "",
        category: "BASE",
        stock: "",
        threshold: 20,
        costPrice: "",
        price: '',
        isAvailable: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInventory((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await createInventory(inventory);
        if (error != null) {
            toast.error(error);
        } else {
            toast.success(data);
        }
        handleReset()
    };

    const handleReset = () => {

        setInventory({
            name: "",
            description: "",
            category: "BASE",
            stock: "",
            threshold: 20,
            costPrice: "",
            price: '',
            isAvailable: true
        });

    };

    const getStatus = () => {
        if (inventory.stock === "") return "Waiting for Input";
        const stock = Number(inventory.stock);
        const threshold = Number(inventory.threshold);
        if (stock === 0) return "Out of Stock";
        if (stock <= threshold) return "Low Stock";
        return "Healthy Stock";
    };

    if (loading) {
        return <Loader />
    }
    return (

        <div className="admin-add-inventory-inventoryPage">

            <div className="admin-add-inventory-pageHeader">
                <div>
                    <h1>Add Inventory Item</h1>
                    <p>
                        Manage pizza ingredients like base, sauce, cheese and vegetables.
                    </p>
                </div>
            </div>

            <form
                className="admin-add-inventory-inventoryForm"
                onSubmit={handleSubmit}
            >


                <div className="admin-add-inventory-leftSection">

                    <div className="admin-add-inventory-card">

                        <h2>Basic Information</h2>

                        <div className="admin-add-inventory-formGroup">

                            <label>Item Name *</label>

                            <input
                                type="text"
                                name="name"
                                value={inventory.name}
                                onChange={handleChange}
                                placeholder="Mozzarella Cheese"
                                required
                            />

                        </div>

                        <div className="admin-add-inventory-formGroup">

                            <label>Description *</label>

                            <input
                                type="text"
                                name="description"
                                value={inventory.description}
                                onChange={handleChange}
                                placeholder="Mozzarella Cheese"
                                required
                            />

                        </div>

                        <div className="admin-add-inventory-row">

                            <div className="admin-add-inventory-formGroup">

                                <label>Category</label>

                                <select
                                    name="category"
                                    value={inventory.category}
                                    onChange={handleChange}
                                >

                                    <option value="BASE">Pizza Base</option>

                                    <option value="SAUCE">Sauce</option>

                                    <option value="CHEESE">Cheese</option>

                                    <option value="VEGETABLE">Vegetable</option>

                                </select>

                            </div>

                            <div className="admin-add-inventory-formGroup">

                                <label>Cost Price (₹)</label>

                                <input
                                    type="number"
                                    name="costPrice"
                                    value={inventory.costPrice}
                                    onChange={handleChange}
                                    placeholder="120"
                                    required
                                />

                            </div>

                            <div className="admin-add-inventory-formGroup">

                                <label>Selling Price (₹)</label>

                                <input
                                    type="number"
                                    name="price"
                                    value={inventory.price}
                                    onChange={handleChange}
                                    placeholder="120"
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    <div className="admin-add-inventory-card">

                        <h2>Inventory Details</h2>

                        <div className="admin-add-inventory-row">

                            <div className="admin-add-inventory-formGroup">

                                <label>Add Stock</label>

                                <input
                                    type="number"
                                    name="stock"
                                    value={inventory.stock}
                                    onChange={handleChange}
                                    placeholder="100"
                                    required
                                />

                            </div>

                            <div className="admin-add-inventory-formGroup">

                                <label>Low Stock Alert</label>

                                <input
                                    type="number"
                                    name="threshold"
                                    value={inventory.threshold}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="admin-add-inventory-switchBox">

                            <input
                                type="checkbox"
                                name="isAvailable"
                                checked={inventory.isAvailable}
                                onChange={handleChange}
                            />

                            <span>Available for Pizza Preparation</span>

                        </div>

                    </div>

                    <div className="admin-add-inventory-buttonGroup">

                        <button
                            type="button"
                            className="admin-add-inventory-resetBtn"
                            onClick={handleReset}
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="admin-add-inventory-saveBtn"
                        >
                            Add Inventory
                        </button>

                    </div>

                </div>


                <div className="admin-add-inventory-rightSection">

                    <div className="admin-add-inventory-card previewCard">

                        <h2>Live Preview</h2>

                        <div className="admin-add-inventory-previewItem">

                            <span>Name</span>

                            <strong>
                                {inventory.name || "--"}
                            </strong>

                        </div>

                        <div className="admin-add-inventory-previewItem">

                            <span>Category</span>

                            <strong>
                                {inventory.category}
                            </strong>

                        </div>

                        <div className="admin-add-inventory-previewItem">

                            <span>Selling Price</span>

                            <strong>

                                {inventory.price
                                    ? `₹${inventory.price}`
                                    : "--"}

                            </strong>

                        </div>

                        <div className="admin-add-inventory-previewItem">

                            <span>Cost Price</span>

                            <strong>

                                {inventory.price
                                    ? `₹${inventory.costPrice}`
                                    : "--"}

                            </strong>

                        </div>

                        <div className="admin-add-inventory-previewItem">

                            <span>Current Stock</span>

                            <strong>

                                {inventory.stock || 0} Units

                            </strong>

                        </div>

                        <div className="admin-add-inventory-previewItem">

                            <span>Threshold</span>

                            <strong>

                                {inventory.threshold} Units

                            </strong>

                        </div>

                        <div className="admin-add-inventory-previewItem">

                            <span>Status</span>

                            <strong className={getStatus().replaceAll(" ", "").toLowerCase()}>

                                {getStatus()}

                            </strong>

                        </div>

                        <div className="admin-add-inventory-previewItem">

                            <span>Availability</span>

                            <strong>

                                {inventory.isAvailable
                                    ? "Available"
                                    : "Unavailable"}

                            </strong>

                        </div>

                    </div>

                </div>

            </form>

        </div>

    );

}