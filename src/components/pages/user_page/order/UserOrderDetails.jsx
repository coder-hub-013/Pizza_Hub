import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import "./userOrders.css";
import "./orderDetails.css";
import { useUser } from "../../../context/user/useUser";
import socket from "../../../utils/socket";
import Loader from "./Loader";
import EmptyOrders from "./EmptyOrders";
import StatusBadge from "./StatusBadge";
import OrderTimeline from "../../admin_page/order/OrderTimeline";
import OrderItems from "./OrderItems";
import ShippingAddress from "./ShippingAddress";
import OrderSummary from "./OrderSummary";

export default function UserOrderDetails() {

    const {order,
            fetchUserOrdersById,userLoading,handleDownloadInvoice
          } = useUser();

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        (async () => { await fetchUserOrdersById(id); })();
    }, []);


    useEffect(() => {
        if(!id) {
            return;
        }
        socket.emit('joinOrderRoom',id);
        
        return() => {
            socket.emit( "leaveOrderRoom",id);
        }
    },[id])

    if (userLoading) {
        return <Loader />;
    }

    if(order == null) {
        return <EmptyOrders></EmptyOrders>
    }

    return (

        <section className="order-details">

            {/* Back */}

            <button

                className="back-btn"

                onClick={() => navigate(-1)}

            >

                ← Back

            </button>

            {/* Header */}

            <div className="details-header">

                <div>

                    <h1>

                        Order #{order?.orderNumber}

                    </h1>

                    <p>

                        {new Date(order.createdAt).toLocaleString()}

                    </p>

                </div>

                <StatusBadge

                    status={order.status}

                />

            </div>

            {/* Timeline */}

            {/* <OrderTimeline

                status={order.status}

            /> */}

            <OrderTimeline status={`${order?.status}`}/>
            

            {/* Items */}

            <OrderItems

                items={order.items}

            />

            {/* Address */}

            <ShippingAddress

                address={order.shippingAddress}

            />

            {/* Payment */}

            <div className="payment-card">

                <h2>

                    Payment Information

                </h2>

                <div className="payment-row">

                    <span>

                        Status

                    </span>

                    <strong>

                        {order.paymentStatus}

                    </strong>

                </div>

                <div className="payment-row">

                    <span>

                        Method

                    </span>

                    <strong>

                        {order?.paymentMethod || 'Payment Method'}

                    </strong>

                </div>

                <div className="payment-row">

                    <span>

                        Payment ID

                    </span>

                    <strong>

                        {order?.paymentId || 'Payment ID'}

                    </strong>

                </div>

            </div>

            {/* Price */}

            <OrderSummary

                subtotal={order.subtotal}

                gst={order.gst}

                deliveryFee={order.deliveryFee}

                discount={order.discount}

                totalAmount={order.totalAmount}

            />

            {/* Buttons */}

            <div className="details-buttons">

                <button

                    className="invoice-btn"
                    onClick={() =>handleDownloadInvoice(id)}
                    disabled={userLoading}

                >

                    Download Invoice

                </button>

            </div>

        </section>

    );

}