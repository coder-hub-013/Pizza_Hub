import "./Checkout.css";

export default function DeliveryNote({

    note,

    setNote

}) {

    const quickNotes = [
        "Leave at door",
        "Ring the bell",
        "Call on arrival",
        "Don't ring the bell"
    ];

    function handleQuickNote(text) {

        setNote(text);

    }

    return (

        <section className="checkout-checkout-card">

            <div className="checkout-delivery-header">

                <h2>

                    Delivery Instructions

                </h2>

                <span>

                    Optional

                </span>

            </div>

            <textarea

                className="checkout-delivery-textarea"

                placeholder="Add instructions for the delivery partner..."

                value={note}

                maxLength={200}

                onChange={(event) => setNote(event.target.value)}

            />

            <div className="checkout-note-footer">

                <div className="checkout-quick-note-list">

                    {

                        quickNotes.map((item) => (

                            <button

                                key={item}

                                type="button"

                                className={
                                    note === item
                                        ? "checkout-quick-note active"
                                        : "checkout-quick-note"
                                }

                                onClick={() => handleQuickNote(item)}

                            >

                                {item}

                            </button>

                        ))

                    }

                </div>

                <small>

                    {note.length}/200

                </small>

            </div>

        </section>

    );

}