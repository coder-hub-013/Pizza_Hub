import {  useState } from "react";

import "./manageInventory.css";
import { useInventory } from "../../../context/inventoryContext/useInventory";
import InventoryStats from "./InventoryStats";
import InventoryFilters from "./InventoryFilters";
import InventoryTable from "./InventoryTable";
import UpdateStockModal from "./UpdateStockModal";
import LoadingPage from "../../user_page/loading/LoadingPage";

export default function ManageInventory() {

    const {loading,inventory} = useInventory();

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    const [status, setStatus] = useState("All");

    const [selectedItem, setSelectedItem] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const filteredInventory = inventory.filter((item) => {

        const matchSearch =
            item.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchCategory =
            category === "All"
            ||
            item.category === category;

        let itemStatus = "Available";

        if (item.stock === 0) {

            itemStatus = "Out Of Stock";

        }

        else if (item.stock <= item.threshold) {

            itemStatus = "Low Stock";

        }

        const matchStatus =
            status === "All"
            ||
            status === itemStatus;

        return (
            matchSearch
            &&
            matchCategory
            &&
            matchStatus
        );

    });

    const openUpdateModal = (item) => {

        setSelectedItem(item);

        setOpenModal(true);

    };

    const closeModal = () => {

        setOpenModal(false);

        setSelectedItem(null);

    };

    if(loading) {
        return <LoadingPage />
    }

    return (

        <div className="admin-manage-inventory-manage-inventory">

            <div className="admin-manage-inventory-page-header">
                <h1>Manage Inventory</h1>
            </div>

            <InventoryStats
                inventory={inventory}
            />

            <InventoryFilters
                search={search}

                setSearch={setSearch}

                category={category}

                setCategory={setCategory}

                status={status}

                setStatus={setStatus}
            />

            <InventoryTable
                inventory={filteredInventory}
                openUpdateModal={openUpdateModal}
            />

            {
                openModal
                &&
                (
                    <UpdateStockModal

                        item={selectedItem}

                        closeModal={closeModal}

                    />
                )

            }
        </div>

    );

}