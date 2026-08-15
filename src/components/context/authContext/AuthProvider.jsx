import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { logout } from "./AuthService";

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function checkAuth() {
        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/router/protectedroute`,
                {
                    credentials: "include",
                }
            );
            const result = await response.json();

            if (response.status == 200) {
                setUser(result?.user);
            } else {
                setUser(null);
            }

        } catch (error) {
            console.log(error);
            setUser(null);

        }
        setLoading(false);
    }

    useEffect(() => {

        (async () => {await checkAuth();})();

    }, []);

    const logoutFunction = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await logout();
            setUser(null);
            return response;
        } catch (error) {
            console.log(error)
            setError(error);
            throw error
        } finally {
            setLoading(false);
        }
    }

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                error,
                setLoading,
                checkAuth,
                logoutFunction
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}