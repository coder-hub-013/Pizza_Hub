const API_URL = `${import.meta.env.VITE_API_URL}/router/admin`;
//admin -> 
export const getAllPizzas = async () => {
    try {
        const response = await fetch(
            `${API_URL}/get-all-pizzas`,
            {
                credentials: "include",
            }
        );
        const result = await response.json();
        if(response.status == 200) {
            return result.pizzas;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        throw new Error(error.message || "Unable to fetch pizzas",{cause:error});
    }
};

export const addPizza = async (payload) => {
    try {
        let response = await fetch(`${API_URL}/add-new-pizza`, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify({data:payload}),
            credentials: 'include'
        });
        const result = await response.json();
        if (response.status == 200) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error.message)
        throw new Error(error || "Unable to fetch pizzas", { cause: error });
    }

};

export const updatePizzaInventory = async (payload) => {

    try {
        let response = await fetch(`${API_URL}/update-pizza-inventory/`, {
            method: "PUT",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        });
        const result = await response.json();
        if (response.status == 200) {
            return result.updatedPizzaInventory;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        throw new Error(error.message || "Unable to fetch pizzas", { cause: error });
    }

};

//user ->
export const getPizzas = async (page,limit) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/router/user/pizzas?page=${page}&limit=${limit}`,
            {
                credentials: "include",
            }
        );
        const result = await response.json();
        if(response.status == 200) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        throw new Error(error.message || "Unable to fetch pizzas",{cause:error});
    }
};
export const getPizzaVieId = async (payload) => {

    try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/router/user/pizza/${payload}`, {
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