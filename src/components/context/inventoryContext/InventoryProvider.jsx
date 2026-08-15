import { useEffect, useState } from "react";
import { addInventory, getAllInventory,updateInventory } from "./inventoryService";
import InventoryContext from "./InventoryContext";


export default function InventoryProvider({ children }) {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const fetchInventory = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getAllInventory();
            setInventory(data?.inventories);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setError(null);
        }
    };

    const createInventory = async (newItem) => {
        try {
            setLoading(true);
            setError(null);
            const createdItem = await addInventory(newItem);
            setInventory((prev) => [...prev, createdItem.inventory]);
            return createdItem.message;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const editInventory = async (payload) => {        try {
            setLoading(true);
            setError(null);
            const updatedItem = await updateInventory(payload);

            setInventory((prev) =>
                prev.map((item) =>
                    item._id === updatedItem._id ? updatedItem : item
                )
            );
            return updatedItem;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {await fetchInventory();})();
    }, []);


    return (
        <InventoryContext.Provider
            value={{
                inventory,
                loading,
                error,

                fetchInventory,
                createInventory,
                editInventory,
                setLoading
            }}
        >
            {children}
        </InventoryContext.Provider>
    );
}
