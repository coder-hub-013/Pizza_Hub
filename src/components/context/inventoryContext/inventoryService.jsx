const API_URL = `${import.meta.env.VITE_API_URL}/router/admin`;

export const getAllInventory = async () => {
    try {
        const response = await fetch(
            `${API_URL}/get-all-inventorys`,
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
        throw new Error(error.message || "Unable to fetch pizzas", { cause: error });
    }

};

export const addInventory = async (inventory) => {

    try {
        let response = await fetch(`${API_URL}/add-new-inventory`, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify({ data: inventory }),
            credentials: 'include'
        });
        const result = await response.json();
        if (response.status == 200) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        throw new Error(error.message || "Unable to fetch pizzas", { cause: error });
    }

};

export const updateInventory = async (payload) => {

    try {
        let response = await fetch(`${API_URL}/update_inventory/`, {
            method: "PUT",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        });
        const result = await response.json();
        if (response.status == 200) {
            return result.updatedInventory;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        throw new Error(error.message || "Unable to fetch pizzas", { cause: error });
    }

};