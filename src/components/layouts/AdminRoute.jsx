import { Outlet } from "react-router-dom";
import InventoryProvider from "../context/inventoryContext/InventoryProvider";

export default function AdminRoute() {
    return (
        <InventoryProvider>
            <Outlet />
        </InventoryProvider>
    );
}

