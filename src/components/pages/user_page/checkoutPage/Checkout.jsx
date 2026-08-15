import { useEffect, useState } from "react";

import "./Checkout.css";
import { toast } from "react-toastify";
import LoadingPage from "../loading/LoadingPage";
import {  useNavigate } from "react-router-dom";
import { useCart } from "../../../context/cart/useCart";
import AddressCard from "./AddressCard";
import CouponBox from "./CouponBox";
import DeliveryNote from "./DeliveryNote";
import OrderSummary from "./OrderSummary";
import PaymentCard from "./PaymentCard";
import AddressModal from "./AddressModal";
import { useCheckout } from "../../../context/checkout_context/useCheckout";

export default function Checkout() {
    const navigate = useNavigate();

    const { selectedCartItemIds, selectedItems, removeSelectedCartItems } = useCart();
    const {
        fetchAddress, checkoutLoading, checkoutError, addresses,
        addNewAddress,
        setCheckoutLoading,
        fetchSelectedItems,
        latestCartData,
        subTotal,
        paymentCreate,
        paymentStart
    } = useCheckout();




    const [showModal, setShowModal] = useState(false);
    const [deliveryNote, setDeliveryNote] = useState("");
    const [coupon, setCoupon] = useState("");
    const [addressError, setAddressError] = useState("");
  
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        if (selectedCartItemIds.length === 0) {
            navigate('/cart', { replace: true });
            return;
        }
        const selectItems = selectedItems;
        const loadCheckoutData = async () => {
            try {
                await Promise.all([fetchAddress(), fetchSelectedItems(selectItems)]);
            } catch (error) {
                toast.error(error.message)
                navigate("/cart", { replace: true });
                return;
            }
        }
        loadCheckoutData();
    }, [])


    const deliveryCharge = subTotal >= 500 ? 0 : 40;

    const gst = Math.round(
        subTotal * 0.05
    );


    const discount = coupon === "PIZZA100" ? 100 : 0;

    const total = subTotal + deliveryCharge + gst - discount;



    function handleAddressSelect(addressId) {
        setSelectedAddress(addressId);
        setAddressError("");
    }


    const handleAddressCreated = async (newAddress) => {

        const data = await addNewAddress(newAddress)
        console.log(data, '----');
        if (checkoutError == null) {
            toast.success(data.message)
        } else {
            toast.error(checkoutError);
        }
        setSelectedAddress(data.address._id);
        
        setAddressError("");
        
        setShowModal(false);
    }


    async function handlePayment() {
        if (!selectedAddress) {

            setAddressError(

                "Please select or add a delivery address before proceeding."

            );

            document
                .getElementById("delivery-address")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            return;

        }
        const address = addresses.find(
            (item) => item._id === selectedAddress
        );

        if (!address) {
            setAddressError(
                "The selected address is no longer available."
            );
            setSelectedAddress(null);
            return;
        }
        setAddressError("");
        setCheckoutLoading(true);
    
        const result = await paymentCreate(selectedAddress, coupon);

        if (!result?.success) {

            toast.error(
                result?.message ||
                "Unable to create payment"
            );

            return;
        }

        const verifyData = await paymentStart(
            result.checkoutData,
            selectedAddress,
            discount
        );


        if (!verifyData?.success) {

            toast.error(
                verifyData?.message ||
                "Payment verification failed"
            );

            return;
        }

        /*
========================================
PAYMENT SUCCESS
========================================
*/

        toast.success(
            verifyData.message ||
            "Payment successful"
        );

        removeSelectedCartItems();
        navigate("/",{replace: true,});
    }

    if (checkoutLoading) {
        return <LoadingPage />
    }

    return (

        <div className="checkout-checkout-page">
            <div className="checkout-checkout-header">
                <button
                    type="button"
                    className="checkout-back-btn"
                onClick={() => navigate("/cart")}
                >
                    ← Back to Cart
                </button>
                <h1>
                    Checkout
                </h1>
            </div>

            <div className="checkout-checkout-container">

                <div className="checkout-checkout-left">
                    {/* DELIVERY ADDRESS */}
                    <section
                        id="delivery-address"
                        className="checkout-checkout-card"
                    >

                        <div className="checkout-section-title">
                            <h2>
                                Delivery Address
                            </h2>
                            <button
                                type="button"
                                className="checkout-primary-btn"
                                onClick={() => {
                                    setAddressError("");
                                    setShowModal(true);
                                }}
                            >
                                + Add Address
                            </button>
                        </div>

                        {
                            subTotal !== null && addressError && (
                                <div className="checkout-address-error">
                                    ⚠️ {addressError}
                                </div>
                            )
                        }

                        {
                            addresses.length === 0 ? (
                                <div className="checkout-no-address">
                                    <div className="checkout-no-address-icon">
                                        📍
                                    </div>
                                    <h3>
                                        No delivery address found
                                    </h3>
                                    <p>
                                        Please add a delivery address
                                        to continue with your order.
                                    </p>

                                    <button
                                        type="button"
                                        className="checkout-primary-btn"
                                        onClick={() =>
                                            setShowModal(true)
                                        }
                                    >
                                        + Add Delivery Address
                                    </button>
                                </div>

                            ) : (

                                <div className="checkout-address-list">
                                    {
                                        addresses.map(
                                            (address) => (
                                                <AddressCard
                                                    key={address._id}
                                                    address={address}
                                                    selected={
                                                        selectedAddress ===
                                                        address._id
                                                    }
                                                    onSelect={() =>
                                                        handleAddressSelect(
                                                            address._id
                                                        )
                                                    }
                                                />
                                            )
                                        )
                                    }
                                </div>
                            )
                        }
                    </section>

                    {/* COUPON */}

                    <CouponBox
                        coupon={coupon}
                        setCoupon={setCoupon}
                    />


                    {/* DELIVERY NOTE */}

                    <DeliveryNote
                        note={deliveryNote}
                        setNote={setDeliveryNote}
                    />
                </div>


                {/* ORDER SUMMARY */}

                <OrderSummary
                    cartItems={latestCartData}
                    subtotal={subTotal}
                    delivery={deliveryCharge}
                    gst={gst}
                    discount={discount}
                    total={total}
                >
                    <PaymentCard
                        loading={checkoutLoading}
                        total={total}
                        handlePayment={handlePayment}
                    />


                </OrderSummary>


            </div>


            {


                showModal && (

                    <AddressModal

                        closeModal={() =>
                            setShowModal(false)
                        }

                        onAddressCreated={
                            handleAddressCreated
                        }

                    />

                )

            }


        </div>

    );

}