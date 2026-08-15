import { useState } from "react";
import "./updateStockModal.css";
import { useInventory } from "../../../context/inventoryContext/useInventory";


export default function UpdateStockModal({ item, closeModal }) {
    const {editInventory} = useInventory();

    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price || "");
    const [stock, setStock] = useState(item.stock);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            id: item._id,
            name,
            price,
            stock,
        };
        editInventory(updatedData);
        closeModal();
    };

    return (
        <div className="admin-manage-inventory-modal-overlay">

            <div className="admin-manage-inventory-modal">

                <div className="admin-manage-inventory-modal-header">

                    <h2>Edit Inventory</h2>

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
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="admin-manage-inventory-info">
                        <label>Category</label>

                        <input
                            type="text"
                            value={item.category}
                            disabled
                        />
                    </div>

                    <div className="admin-manage-inventory-info">
                        <label>Price</label>

                        <input
                            type="number"
                            min="0"
                            value={price}
                            onChange={(event) =>
                                setPrice(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="admin-manage-inventory-info">
                        <label>Stock</label>

                        <input
                            type="number"
                            min="0"
                            value={stock}
                            onChange={(event) =>
                                setStock(event.target.value)
                            }
                            required
                        />
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