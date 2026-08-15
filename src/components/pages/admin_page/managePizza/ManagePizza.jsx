import { useEffect, useState } from "react";
import "../manageInventory/manageInventory.css";
import { usePizza } from "../../../context/pizzaContext/usePizza";
import ManagePizzaStats from "./ManagePizzaStats";
import ManageFilterPizza from "./ManageFilterPizza";
import ManagePizzaTable from "./ManagePizzaTable";
import UpdateManagePizzaModal from './UpdateManagePizzaModal'
import LoadingPage from "../../user_page/loading/LoadingPage";



export default function ManagePizza() {

    const {fetchPizzas,loading,pizzas} = usePizza();
    
    useEffect(() => {
        (async () => {await fetchPizzas();})();
    }, []);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const filteredInventory = pizzas.filter((item) => {
        const matchSearch =
            item.name
                .toLowerCase()
                .includes(search.toLowerCase());

        let itemStatus = "Available";
        if (!item.isAvailable) {
            itemStatus = "Out Of Stock";
        }
        
        const matchStatus =
            status === "All"
            ||
            status === itemStatus;
        return (
            matchSearch
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

        <div className="admin-manage-pizza-manage-inventory">

            <div className="admin-manage-pizza-page-header">
                <h1>Manage Pizza</h1>
            </div>
            
            <ManagePizzaStats 
                pizza={pizzas}
            />

            <ManageFilterPizza 
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
            />

            <ManagePizzaTable 
                pizzas={filteredInventory}
                openUpdateModal={openUpdateModal}
            />


            {
                openModal
                &&
                (
                    <UpdateManagePizzaModal

                        item={selectedItem}

                        closeModal={closeModal}

                    />
                )

            }
        </div>

    );

}