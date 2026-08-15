import "./Checkout.css";

export default function PaymentCard({

    total,

    loading,

    handlePayment

}) {

    return (

        <div className="checkout-payment-card">

            <h3>

                Payment Method

            </h3>

            <div className="checkout-payment-method">

                <div className="checkout-payment-icon">

                    💳

                </div>

                <div className="checkout-payment-details">

                    <h4>

                        Razorpay Secure Checkout

                    </h4>

                    <p>

                        UPI • Cards • Net Banking • Wallets

                    </p>

                </div>

                <div className="checkout-payment-status">

                    ✓

                </div>

            </div>

            <div className="checkout-payment-security">

                <div>

                    🔒 SSL Encrypted

                </div>

                <div>

                    100% Secure Payments

                </div>

            </div>

            <button

                className="checkout-pay-button"

                disabled={loading}

                onClick={handlePayment}

            >

                {

                    loading

                        ? (

                            <>
                                <span className="checkout-loader"></span>

                                Processing Payment...

                            </>

                        )

                        : (

                            `Pay ₹${total}`

                        )

                }

            </button>

            <p className="checkout-payment-note">

                By clicking <strong>Pay</strong>, you agree to our
                Terms & Conditions and proceed to Razorpay's secure
                payment gateway.

            </p>

        </div>

    );

}