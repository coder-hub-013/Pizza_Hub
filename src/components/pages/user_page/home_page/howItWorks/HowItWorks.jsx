import "./howItWorks.css";

const steps = [
  {
    id: "01",
    icon: "🍕",
    title: "Choose Your Pizza",
    description:
      "Browse our delicious menu or create your own custom pizza.",
  },
  {
    id: "02",
    icon: "🛠️",
    title: "Customize",
    description:
      "Select your favorite base, sauce, cheese, and vegetables.",
  },
  {
    id: "03",
    icon: "💳",
    title: "Pay Securely",
    description:
      "Complete your order using Razorpay's secure online payment gateway.",
  },
  {
    id: "04",
    icon: "🚚",
    title: "Track Your Order",
    description:
      "Watch your order status update from Order Received to Delivered.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">

      <div className="how-header">
        <span>HOW IT WORKS</span>

        <h2>Order Your Favorite Pizza In 4 Easy Steps</h2>

        <p>
          Ordering your favorite pizza is simple, fast, and completely online.
        </p>
      </div>

      <div className="timeline">

        {steps.map((step, index) => (
          <div className="timeline-item" key={step.id}>

            <div className="circle">
              {step.icon}
            </div>

            <div className="step-number">
              {step.id}
            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>

            {index !== steps.length - 1 && (
              <div className="line"></div>
            )}

          </div>
        ))}

      </div>

    </section>
  );
}