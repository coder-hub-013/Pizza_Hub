const API_URL = `${import.meta.env.VITE_API_URL}/router/auth`;

export const logout = async () => {
    try {
        const response = await fetch(
            `${API_URL}/logout`,
            {
                method: "POST",
                credentials: "include",
            }
        );
        const result = await response.json();
        if(response.status == 200) {
            return result;
        } else {
            throw new Error(response?.message || "Logout failed")
        }
        
    } catch (error) {
        console.log(error);
        throw new Error(error.message || "Unable to fetch details", { cause: error });
    }
}