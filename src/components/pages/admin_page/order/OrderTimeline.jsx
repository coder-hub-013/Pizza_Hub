import "./orderTimeline.css";

const ORDER_STEPS = [

    {
        key: "ORDER_RECEIVED",
        label: "Order Received",
        icon: "📦",
    },

    {
        key: "IN_KITCHEN",
        label: "In Kitchen",
        icon: "👨‍🍳",
    },

    {
        key: "SENT_TO_DELIVERY",
        label: "Out For Delivery",
        icon: "🛵",
    },

    {
        key: "DELIVERED",
        label: "Delivered",
        icon: "🏠",
    },

];

export default function OrderTimeline({ status }) {

    const currentStep = ORDER_STEPS.findIndex(
        step => step.key === status
    );

    return (

        <div className="admin-order-admin-timeline-card">

            <h2>

                Order Timeline

            </h2>

            <div className="admin-order-admin-timeline">

                {

                    ORDER_STEPS.map((step, index) => {

                        const completed = index <= currentStep;

                        return (

                            <div
                                className="admin-order-admin-timeline-step"
                                key={step.key}
                            >

                                {

                                    index !== 0 && (

                                        <div
                                            className={`admin-timeline-line ${completed ? "completed" : ""}`}
                                        />

                                    )

                                }

                                <div
                                    className={`admin-timeline-circle ${completed ? "completed" : ""}`}
                                >

                                    {

                                        completed

                                        ?

                                        "✓"

                                        :

                                        step.icon

                                    }

                                </div>

                                <h4>

                                    {step.label}

                                </h4>

                                <p>

                                    {

                                        completed

                                        ?

                                        "Completed"

                                        :

                                        "Waiting..."

                                    }

                                </p>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}