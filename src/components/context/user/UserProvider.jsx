import { useState } from "react";
import UserContext from "./UserContext";
import { downloadInvoice, getUserInventory, getUserOrderById, getUserOrders } from "./UserService";
import { useEffect } from "react";
import { useCallback } from "react";
import socket from "../../utils/socket";


export default function UserProvider({ children }) {
    const [userInventory, setUserInventory] = useState([]);
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState(null);

    const [userOrders, setUserOrders] = useState([]);
    const [order, setOrder] = useState(null);

    const fetchUserInventory = async () => {
        try {
            setUserLoading(true);
            setUserError(null);

            const data = await getUserInventory();
            setUserInventory(data?.inventories);
        } catch (err) {
            console.log(err)
            setUserError(err.message);
        } finally {
            setUserLoading(false);
        }
    };


    const fetchUserOrders = async () => {
        try {
            setUserLoading(true);
            setUserError(null);
            const data = await getUserOrders();
            setUserOrders(data?.orders);
        } catch (error) {
            setUserError(error.message);
        } finally {
            setUserLoading(false);
            setUserError(null);
        }
    }

    const fetchUserOrdersById = async (orderId) => {
        try {
            setUserLoading(true);
            setUserError(null);
            const data = await getUserOrderById(orderId);
            setOrder(data?.order);
        } catch (error) {
            setUserError(error.message);
        } finally {
            setUserLoading(false);
            setUserError(null);
        }
    }

    const updateOrderStatusInState = useCallback(
        (data) => {

            const {
                orderId,
                status,
            } = data;

            /*
            ==================================
            UPDATE ALL ORDERS
            ==================================
            */

            setUserOrders((prevOrders) => {
                return prevOrders.map(
                    (item) =>
                        item._id === orderId
                            ? {
                                ...item,
                                status,
                            }
                            : item
                );

            });


            /*
            ==================================
            UPDATE CURRENT ORDER
            ==================================
            */

            setOrder((prevOrder) => {

                if (!prevOrder) {
                    return prevOrder;
                }

                if (
                    prevOrder._id !==
                    orderId
                ) {

                    return prevOrder;

                }

                return {
                    ...prevOrder,
                    status,
                };

            });

        },
        []
    );

    useEffect(() => {

        const handleOrderStatusUpdated =
            (data) => {

                updateOrderStatusInState(
                    data
                );

            };


        socket.on(
            "orderStatusUpdated",
            handleOrderStatusUpdated
        );


        return () => {

            socket.off(
                "orderStatusUpdated",
                handleOrderStatusUpdated
            );

        };

    }, [
        updateOrderStatusInState,
    ]);

    const handleDownloadInvoice = async () => {
        setUserLoading(true);
        try {
            const response = await downloadInvoice(order);
            return response
        } catch (err) {
            setUserError(err.message);
        } finally {
            setUserLoading(false);
        }
    };

    return (
        <UserContext.Provider
            value={{
                userInventory,
                userLoading,
                userError,
                userOrders,
                order,

                fetchUserInventory,
                fetchUserOrders,
                setUserLoading,
                fetchUserOrdersById,
                handleDownloadInvoice
            }}
        >
            {children}
        </UserContext.Provider>
    );
}