import "./whyChooseUs.css";

const features = [
  {
    id: 1,
    icon: "🍕",
    title: "Freshly Prepared",
    description:
      "Every pizza is prepared only after you place your order using fresh ingredients.",
  },
  {
    id: 2,
    icon: "🥬",
    title: "Quality Ingredients",
    description:
      "Premium cheese, fresh vegetables, and authentic sauces ensure the best taste.",
  },
  {
    id: 3,
    icon: "⚡",
    title: "Fast Delivery",
    description:
      "Our team prepares and delivers your pizza as quickly as possible.",
  },
  {
    id: 4,
    icon: "🛠️",
    title: "Custom Pizza Builder",
    description:
      "Create your own pizza by selecting the base, sauce, cheese, and vegetables you like.",
  },
  {
    id: 5,
    icon: "🔒",
    title: "Secure Payment",
    description:
      "Safe online payments powered by Razorpay test integration.",
  },
  {
    id: 6,
    icon: "📦",
    title: "Real-Time Order Tracking",
    description:
      "Track your pizza from Order Received to Delivery in real time.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us">

      <div className="why-header">
        <span>WHY CHOOSE US</span>

        <h2>Everything You Need For A Great Pizza Experience</h2>

        <p>
          We focus on quality, customization, and fast delivery to make every
          order delicious and memorable.
        </p>
      </div>

      <div className="feature-grid">

        {features.map((feature) => (
          <div className="feature-card" key={feature.id}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>
        ))}

      </div>

    </section>
  );
}