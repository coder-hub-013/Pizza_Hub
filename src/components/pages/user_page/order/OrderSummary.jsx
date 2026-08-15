export default function OrderSummary({
    subtotal,
    deliveryFee,
    discount,
    totalAmount,
    gst,
}) {

    const finalSubtotal = subtotal || 0;
    const finalDeliveryFee = deliveryFee || 0;
    const finalDiscount = discount || 0;
    const finalTotal = totalAmount || 0;

    return (

        <section className="summary-card">

            <div className="summary-header">

                <h2>
                    🧾 Price Summary
                </h2>

            </div>

            <div className="summary-body">

                <div className="summary-row">

                    <span>
                        Subtotal
                    </span>

                    <span>
                        ₹{finalSubtotal}
                    </span>

                </div>

                <div className="summary-row">

                    <span>
                        Delivery Fee
                    </span>

                    <span>
                        ₹{finalDeliveryFee}
                    </span>

                </div>

                <div className="summary-row discount">

                    <span>
                        Discount
                    </span>

                    <span>
                        - ₹{finalDiscount}
                    </span>

                </div>

                <div className="summary-row">

                    <span>
                        GST
                    </span>

                    <span>
                         ₹{gst}
                    </span>

                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">

                    <span>
                        Grand Total
                    </span>

                    <span>
                        ₹{finalTotal}
                    </span>

                </div>

            </div>

        </section>

    );

}