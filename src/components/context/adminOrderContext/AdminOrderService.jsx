const API_URL = `${import.meta.env.VITE_API_URL}/router/admin`;

export const dashboardData = async () => {
    try {
        const response = await fetch(
            `${API_URL}/dashboard`,
            {
                credentials: 'include',
            }
        );

        const result = await response.json();
        if (response.status == 200) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message || "Unable to fetch pizzas", { cause: error });
    }

};


export const getAllOrdersForAdmin = async () => {
    try {
        const response = await fetch(
            `${API_URL}/orders`,
            {
                credentials: 'include',
            }
        );

        const result = await response.json();
        if (response.status == 200) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message || "Unable to fetch pizzas", { cause: error });
    }

};

export const getOrderForAdminById = async (id) => {
    try {
        const response = await fetch(
            `${API_URL}/order/${id}`,
            {
                credentials: 'include',
            }
        );

        const result = await response.json();
        if (response.status == 200) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message || "Unable to fetch pizzas", { cause: error });
    }

};

export const updateStatus = async (id, newStatus) => {
    try {
        const response = await fetch(`${API_URL}/order/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({status:newStatus}),
        });

        const result = await response.json();
        if (response.status == 200) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message || "Unable to fetch pizzas", { cause: error });
    }
};