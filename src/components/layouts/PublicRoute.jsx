import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/authContext/useAuth";
import CartProvider from "../context/cart/CartProvider";
import UserProvider from "../context/user/UserProvider";
import CheckoutProvider from "../context/checkout_context/CheckoutProvider";



export default function PublicRoute() {

    const { user } = useAuth();


    if (user?.role === "ADMIN") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return (
        <CartProvider>
            <UserProvider>
                <CheckoutProvider>
                    <Outlet></Outlet>
                </CheckoutProvider>
            </UserProvider>
        </CartProvider>
    )
}