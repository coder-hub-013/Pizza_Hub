import { useEffect, useMemo, useState } from "react";
import CartContext from "./CartContext";


export default function CartProvider({ children }) {

    const [selectedCartItemIds, setSelectedCartItemIds] = useState(
        () => {
            const saved = sessionStorage.getItem(
                "selectedCartItemIds"
            );

            return saved
                ? JSON.parse(saved)
                : [];
        }
    );

    useEffect(() => {

        sessionStorage.setItem(
            "selectedCartItemIds",
            JSON.stringify(selectedCartItemIds)
        );

    }, [selectedCartItemIds]);

    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cart");

        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const syncCart = () => {
            const cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            setCartItems(cart);
        };

        window.addEventListener(
            "cartUpdated",
            syncCart
        );

        return () =>
            window.removeEventListener(
                "cartUpdated",
                syncCart
            );
    }, []);


    const addToCart = (cartItem) => {
        try {
            setCartItems((prevCart) => {
                const existingItem = prevCart.find((item) => {

                    if (
                        item.type === "predefined" &&
                        cartItem.type === "predefined"
                    ) {
                        return item.pizzaId === cartItem.pizzaId;
                    }

                    if (
                        item.type === "custom" &&
                        cartItem.type === "custom"
                    ) {
                        return (
                            item.customPizza.base._id === cartItem.customPizza.base._id &&
                            item.customPizza.sauce._id === cartItem.customPizza.sauce._id &&
                            item.customPizza.cheese._id === cartItem.customPizza.cheese._id &&
                            JSON.stringify(item.customPizza.vegetables) === JSON.stringify(cartItem.customPizza.vegetables)
                        );
                    }

                    return false;
                });

                if (existingItem) {
                    return prevCart.map((item) =>
                        item === existingItem
                            ? {
                                ...item,
                                quantity: item.quantity + cartItem.quantity,
                            }
                            : item
                    );
                }

                return [
                    ...prevCart,
                    {
                        ...cartItem,
                        cartId: crypto.randomUUID(),
                    },
                ];
            });

            return {
                success: true,
                message: "Item added to cart."
            };

        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "Failed to add item to cart."
            };
        }
    };


    // Remove item
    const removeFromCart = (cartId) => {
        setCartItems((prev) =>
            prev.filter((item) => item.cartId !== cartId)
        );
    };

    // Increase quantity
    const increaseQuantity = (cartId) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.cartId === cartId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Decrease quantity
    const decreaseQuantity = (cartId) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.cartId === cartId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    const subtotal = useMemo(
        () =>
            cartItems
                .filter((item) =>
                    selectedCartItemIds.includes(item.cartId)
                )
                .reduce(
                    (total, item) =>
                        total + item.price * item.quantity,
                    0
                ),
        [cartItems, selectedCartItemIds]
    );

    const handleSelectItem = (cartId) => {
        setSelectedCartItemIds((prev) => {
            if (prev.includes(cartId)) {
                return prev.filter(
                    (id) => id !== cartId
                );
            }
            return [
                ...prev,
                cartId
            ];
        });
    };

    const selectedItems = cartItems.filter(
        item => selectedCartItemIds.includes(item.cartId)
    );

    function updateCart(updatedItems) {
        setCartItems(prev => {
            const newCart = prev.map(item => {
                const updated = updatedItems.find(
                    u => u.cartId === item.cartId
                );

                return updated
                    ? { ...item, ...updated }
                    : item;
            });

            localStorage.setItem(
                "cart",
                JSON.stringify(newCart)
            );

            return newCart;
        });
    }

    function removeSelectedCartItems() {
        const storedCart = localStorage.getItem("cart");
        if (!storedCart) {
            sessionStorage.removeItem("selectedCartItemIds");
            setSelectedCartItemIds([]);
            return;
        }
        const cart = JSON.parse(storedCart);
        const updatedCart = cart.filter(
            (item) => !selectedCartItemIds.includes(item.cartId)
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        sessionStorage.removeItem("selectedCartItemIds");
        setSelectedCartItemIds([]);

        window.dispatchEvent(new Event("cartUpdated"));
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                subtotal,
                selectedCartItemIds,

                setCartItems,

                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                handleSelectItem,
                selectedItems,
                updateCart,
                removeSelectedCartItems
            }}
        >
            {children}
        </CartContext.Provider>
    );
}