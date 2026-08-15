const API_URL = `${import.meta.env.VITE_API_URL}/router/user`;

export const getUserInventory = async () => {
    try {
        const response = await fetch(
            `${API_URL}/get-all-user-inventorys`,
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


export const getUserOrders = async () => {
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
        throw new Error(error.message || "Unable to fetch pizzas", { cause: error });
    }

};

export const getUserOrderById = async (orderId) => {
    try {
        const response = await fetch(
            `${API_URL}/orders/${orderId}`,
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

export const downloadInvoice = async (order) => {
    try {

        const response = await fetch(
            `${API_URL}/orders/${order._id}/invoice`,
            {
                method: "GET",
                credentials: "include",
            }
        );


        if (!response.ok) {
            throw new Error(
                "Failed to download invoice"
            );
        }


        // Convert response into PDF Blob
        const blob = await response.blob();

        // Create temporary URL
        const url = window.URL.createObjectURL(blob);

        // Create temporary <a>
        const link = document.createElement("a");

        link.href = url;

        link.download = `invoice-${order?._id}.pdf`;

        // Add to DOM
        document.body.appendChild(link);

        // Start download
        link.click();

        // Remove element
        link.remove();

        // Release memory
        window.URL.revokeObjectURL(url);

    } catch (error) {

        console.error(
            "Invoice download failed:",
            error
        );

    }
}