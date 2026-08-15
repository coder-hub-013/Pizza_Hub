import { useNavigate, useParams } from "react-router-dom";
import "./orderDetails.css";
import { useEffect } from "react";
import { useAdminOrderContext } from "../../../context/adminOrderContext/useAdminOrderContext";
import OrderTimeline from "./OrderTimeline";
import UpdateOrderStatus from "./UpdateOrderStatus";
import LoadingPage from "../../user_page/loading/LoadingPage";

export default function OrderDetails() {
    const { fetchOrderById, order, loading,updateOrderStatus } = useAdminOrderContext();

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        (async () => { await fetchOrderById(id); })();
    }, []);

    const payment = {

        method: "Razorpay",

        transactionId: "PAY_78HGDT89JKL",

        paymentStatus: "Paid",

        subtotal: 897,

        gst: 45,

        deliveryCharge: 50,

        discount: 100,

        total: 892

    };

    const handleStatusUpdate = (newStatus) => {
        updateOrderStatus(id,newStatus)

    };

    if (loading) {
        <LoadingPage />
    }

    if (!order) {
        return <p>No Order Found.</p>
    }


    return (

        <div className="admin-order-order-details">

            <div className="admin-order-page-header">

                <div>

                    <h1>

                        Order Details

                    </h1>

                    <p>

                        View complete order information

                    </p>

                </div>

                <button

                    className="admin-order-back-btn"

                    onClick={() => navigate(-1)}

                >

                    ← Back

                </button>

            </div>

            <div className="admin-order-info-grid">

                <div className="admin-order-info-card">

                    <h2>

                        Order Information

                    </h2>

                    <p>

                        <strong>Order ID :</strong>

                        {order.orderNumber}

                    </p>

                    <p>

                        <strong>Date :</strong>

                        {order.createdAt}

                    </p>

                    <p>

                        <strong>Payment :</strong>

                        {order?.payment?.provider}

                    </p>

                    <p>

                        <strong>Status :</strong>

                        {order?.payment?.status}

                    </p>

                </div>

                <div className="admin-order-info-card">

                    <h2>

                        Customer Information

                    </h2>

                    <p>

                        <strong>Name :</strong>

                        {order.shippingAddress.name}

                    </p>

                    <p>

                        <strong>Email :</strong>

                        {order.customer.email}

                    </p>

                    <p>

                        <strong>Phone :</strong>

                        {order.shippingAddress.mobileNumber}

                    </p>

                </div>

                <div className="admin-order-info-card">

                    <h2>

                        Delivery Address

                    </h2>

                    <p>

                        {order?.shippingAddress.houseNo}

                    </p>

                    <p>

                        {order?.shippingAddress.street}

                    </p>

                    <p>

                        {order?.shippingAddress.landmark}

                    </p>

                    <p>

                        {order?.shippingAddress.city}

                    </p>

                    <p>

                        {order?.shippingAddress.state}

                    </p>

                    <p>

                        {order?.shippingAddress.country}

                    </p>

                    <p>

                        {order?.shippingAddress.zipCode}

                    </p>

                    <p>

                        {order?.shippingAddress.addressType}

                    </p>

                </div>

            </div>

            <div className="admin-order-items-card">

                <div className="admin-order-card-header">

                    <h2>Ordered Items</h2>

                </div>

                <div className="admin-order-ordered-items">

                    {

                        order.items.map((item) => (

                            <div
                                className="admin-order-order-item"
                                key={item._id}
                            >

                                <div className="admin-order-item-top">

                                    <div>

                                        <h3>{item.name}</h3>

                                        <span className={`type ${item.type.toLowerCase()}`}>
                                            {item.type}
                                        </span>

                                    </div>

                                    <div className="admin-order-item-total">
                                        ₹{item.totalPrice}
                                    </div>

                                </div>

                                <div className="admin-order-item-body">

                                    {

                                        item.type === "CUSTOM"

                                            ?

                                            <div className="admin-order-custom-details">

                                                <div>

                                                    <strong>Base</strong>

                                                    <p>{item?.customPizza?.base?.name}</p>

                                                </div>

                                                <div>

                                                    <strong>Sauce</strong>

                                                    <p>{item?.customPizza?.sauce?.name}</p>

                                                </div>

                                                <div>

                                                    <strong>Cheese</strong>

                                                    <p>{item?.customPizza?.cheese?.name}</p>

                                                </div>

                                                <div>

                                                    <strong>Vegetables</strong>

                                                    <p>
                                                        {item?.customPizza?.vegetables
                                                            ?.map((vegetable) => vegetable.name)
                                                            .join(", ")}
                                                    </p>
                                                </div>

                                            </div>

                                            :

                                            <div className="admin-order-size">

                                                <strong>Size</strong>

                                                {/* <p>{item.size}</p> */}
                                                <p>MEDIUM</p>

                                            </div>

                                    }

                                </div>

                                <div className="admin-order-item-footer">

                                    <span>

                                        Qty :
                                        <strong>{item.quantity}</strong>

                                    </span>

                                    <span>

                                        Price :
                                        <strong> ₹{item.unitPrice}</strong>

                                    </span>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

            <div className="admin-order-payment-summary-grid">

                <div className="admin-order-payment-card">

                    <h2>

                        Payment Details

                    </h2>

                    <div className="admin-order-payment-row">

                        <span>

                            Payment Method

                        </span>

                        <span>

                            {order?.payment?.provider}

                        </span>

                    </div>

                    <div className="admin-order-payment-row">

                        <span>

                            Transaction ID

                        </span>

                        <span>

                            {order?.payment?.paymentId}

                        </span>

                    </div>

                    <div className="admin-order-payment-row">

                        <span>

                            Payment Status

                        </span>

                        <span className="admin-order-paid">

                            {order?.payment?.status}

                        </span>

                    </div>

                </div>

                <div className="admin-order-summary-card">

                    <h2>

                        Order Summary

                    </h2>

                    <div className="admin-order-summary-row">

                        <span>

                            Subtotal

                        </span>

                        <span>

                            ₹{payment.subtotal}

                        </span>

                    </div>

                    <div className="admin-order-summary-row">

                        <span>

                            GST

                        </span>

                        <span>

                            ₹{payment.gst}

                        </span>

                    </div>

                    <div className="admin-order-summary-row">

                        <span>

                            Delivery Charge

                        </span>

                        <span>

                            ₹{order.deliveryFee}

                        </span>

                    </div>

                    <div className="admin-order-summary-row">

                        <span>

                            Discount

                        </span>

                        <span>

                            -₹{order.discount}

                        </span>

                    </div>

                    <hr />

                    <div className="admin-order-summary-total">

                        <span>

                            Grand Total

                        </span>

                        <span>

                            ₹{order.totalAmount}

                        </span>

                    </div>

                </div>

            </div>

            <OrderTimeline status={`${order.status}`} />

            {order?.status != 'DELIVERED' && <UpdateOrderStatus currentStatus={`${order.status}`} onUpdateStatus={handleStatusUpdate} />}



        </div>

    );

}