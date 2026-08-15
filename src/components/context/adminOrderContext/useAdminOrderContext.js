import { useContext } from "react";
import AdminOrderContext from "./AdminOrderContext";

export const useAdminOrderContext = () => {
    return useContext(AdminOrderContext);
};