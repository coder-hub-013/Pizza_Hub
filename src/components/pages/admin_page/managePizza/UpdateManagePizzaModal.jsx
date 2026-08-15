import { useState } from "react";
import "../manageInventory/updateStockModal.css";
import { usePizza } from "../../../context/pizzaContext/usePizza";


export default function UpdateManagePizzaModal({ item, closeModal }) {
    const {editPizzaInventory} = usePizza();

    const [formData, setFormData] = useState({
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price,
        isAvailable: item.isAvailable,
        base: item.base,
        sauce: item.sauce,
        cheese: item.cheese,
        vegetables: item.vegetables,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedData = {
            id: item._id,
            formData
        };
        editPizzaInventory(updatedData);
        closeModal();
    };

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    return (
        <div className="admin-manage-inventory-modal-overlay">

            <div className="admin-manage-inventory-modal">

                <div className="admin-manage-inventory-modal-header">

                    <h2>Edit Pizza Inventory</h2>

                    <button
                        className="admin-manage-inventory-close-btn"
                        onClick={closeModal}
                    >
                        ✕
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="admin-manage-inventory-info">
                        <label>Name</label>

                        <input
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                            required
                        />
                    </div>

                     <div className="admin-manage-inventory-formGroup">

                        <label>Description</label>

                        <textarea
                            rows="4"
                            name="description"
                            value={formData .description}
                            onChange={handleChange}
                            placeholder="Enter pizza description..."
                        />

                    </div>

                    <div className="admin-manage-inventory-info">
                        <label>Base</label>

                        <input
                            type="text"
                            value={formData.base.name}
                            disabled
                        />
                    </div>
                    <div className="admin-manage-inventory-info">
                        <label>Sauce</label>

                        <input
                            type="text"
                            value={formData.sauce.name}
                            disabled
                        />
                    </div>
                    <div className="admin-manage-inventory-info">
                        <label>Cheese</label>

                        <input
                            type="text"
                            value={formData.cheese.name}
                            disabled
                        />
                    </div>

                    <div className="admin-manage-inventory-info">
                        <label>Vegetables</label>

                        <input
                            type="text"
                            value={formData.vegetables.map(v => v.name).join(", ")}
                            disabled
                        />

                    </div>


                    <div className="admin-manage-inventory-info">
                        <label>Price</label>

                        <input
                            type="number"
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            name="price"
                        />
                    </div>

                    <div className="admin-manage-inventory-card">
                        <h2>Pizza Image</h2>
                        <div className="admin-manage-inventory-formGroup">
                            <label>Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Paste Image URL"
                            />
                        </div>

                        {
                            formData.image &&
                            <div className="admin-manage-inventory-preview">
                                <img
                                    src={formData.image}
                                    alt="preview"
                                />
                            </div>
                        }
                    </div>

                    <div className="admin-manage-inventory-card">

                    <h2>Settings</h2>

                    <label className="admin-manage-inventory-checkboxItem">

                        <input
                            type="checkbox"
                            name="isAvailable"
                            checked={formData.isAvailable}
                            onChange={handleChange}
                        />

                        Available for Order

                    </label>

                </div>

                    <div className="admin-manage-inventory-modal-buttons">

                        <button
                            type="button"
                            className="admin-manage-inventory-cancel-btn"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="admin-manage-inventory-update-btn"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}