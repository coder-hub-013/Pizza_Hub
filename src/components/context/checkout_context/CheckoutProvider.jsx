import { useState } from "react";
import CheckoutContext from "./CheckoutContext";
import { addAddress, createPayment, fetchSelectedData, getAddresses, startPayment } from "./CheckoutService";
export default function CheckoutProvider({ children }) {

    const [addresses, setAddresses] = useState([]);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);
    const [latestCartData, setLatestCartData] = useState([]);
    const [subTotal, setSubTotal] = useState(null);



    function updateCartStorage(updatedCartItems) {
        const storedCart = localStorage.getItem("cart");
        if (!storedCart) return;

        const cart = JSON.parse(storedCart);

        const updatedCart = cart.map((item) => {
            const updatedItem = updatedCartItems.find(
                (u) => u.cartId === item.cartId
            );

            return updatedItem
                ? {
                    ...item,
                    ...updatedItem,
                }
                : item;
        });

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    }


    const fetchAddress = async () => {
        setCheckoutLoading(true);
        try {
            const result = await getAddresses();
            setAddresses(result);
        } catch (error) {
            console.log(error);
            setCheckoutError(error.message);
        } finally {
            setCheckoutLoading(false);
        }
    };

    const addNewAddress = async (payload) => {
        setCheckoutLoading(true);
        try {
            const result = await addAddress(payload);
            setAddresses((prevAddresses) => [
                ...prevAddresses,
                result.address
            ]);
            return result;
        } catch (error) {
            console.log(error);
            setCheckoutError(error.message);
        } finally {
            setCheckoutLoading(false);
        }
    }

    const fetchSelectedItems = async (payload) => {
        setCheckoutLoading(true);
        try {
            const result = await fetchSelectedData(payload);
            updateCartStorage(result?.items);
            setLatestCartData(result.items);
            setSubTotal(result?.subtotal);
            return result;

        } catch (error) {
            console.log(error);
            setCheckoutError(error.message);
            throw error;
        } finally {
            setCheckoutLoading(false);
        }
    }

    const paymentCreate = async (selectedAddress,coupon) => {
        setCheckoutLoading(true);
        try {
            const result = await createPayment(latestCartData, selectedAddress,coupon);
            return result;
        } catch (error) {
            console.log(error);
            setCheckoutError(error.message);
        } finally {
            setCheckoutLoading(false);
        }
    }

    const paymentStart = async (checkoutData,selectedAddress,discount) => {
        setCheckoutLoading(true);
        try {
            const result = await startPayment(checkoutData,selectedAddress,latestCartData,subTotal,discount);
            return result;
        } catch (error) {
            setCheckoutError(error.message);
            return {
            success: false,
            message:
                error.message ||
                "Payment verification failed",
            };
        } finally {
            setCheckoutLoading(false);
        }
    }

    return (
        <CheckoutContext.Provider
            value={{
                checkoutLoading,
                checkoutError,
                addresses,
                setCheckoutLoading,
                latestCartData,
                subTotal,

                fetchAddress,
                addNewAddress,
                fetchSelectedItems,
                paymentCreate,
                paymentStart
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}