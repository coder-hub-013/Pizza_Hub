const API_URL = `${import.meta.env.VITE_API_URL}/router/user`;

export const getAddresses = async () => {
    try {
        const response = await fetch(
            `${API_URL}/get-user-address`,
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

export const addAddress = async (payload) => {

    try {
        let response = await fetch(`${API_URL}/add-new-address`, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify({ data: payload }),
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

export const fetchSelectedData = async (payload) => {

    try {
        let response = await fetch(`${API_URL}/latest-cart-data-on-checkout`, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify({ items: payload }),
            credentials: 'include'
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

export const createPayment = async (latestCartData, selectedAddress,coupon) => {

    try {
        let response = await fetch(`${API_URL}/payment/create`, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify({
                items: latestCartData,
                addressId: selectedAddress,coupon:coupon
            }),
            credentials: 'include'
        });
        const result = await response.json();
        if (response.status == 200) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.message || "Unable to fetch pizzas", { cause: error });
    }
};

async function verifyPayment(response, checkoutData, selectedAddress, selectedItems, subTotal, discount) {
    const res = await fetch(`${API_URL}/payment/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            items: selectedItems,
            selectedAddress,
            subTotal,
            discount,
        }),
    });

    const data = await res.json();
    if (res.status == 200) {
        return data;
    }
    throw new Error(data.message || "Payment verification failed");

}

const loadScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const startPayment = async (checkoutData,selectedAddress,selectedItems,subTotal,discount) => {

    const loaded = await loadScript();

    if (!loaded) {
        throw new Error("Razorpay SDK failed to load");
    }

    return new Promise((resolve, reject) => {

        const options = {

            key: import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount: checkoutData.amount,

            currency: checkoutData.currency,

            order_id: checkoutData.razorpayOrderId,

            name: "Pizza App",

            description: "Pizza Order",

            handler: async (response) => {

                try {

                    const data = await verifyPayment(
                        response,
                        checkoutData,
                        selectedAddress,
                        selectedItems,
                        subTotal,
                        discount
                    );

                    resolve(data);

                } catch (error) {

                    reject(error);

                }
            },

            modal: {

                ondismiss: () => {

                    reject(
                        new Error("Payment cancelled")
                    );

                },
            },
        };

        const rzp = new window.Razorpay(options);

        rzp.open();

    });
};