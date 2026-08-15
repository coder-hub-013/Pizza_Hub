import { Link } from "react-router-dom";
import "./customPizza.css";

export default function CustomPizza() {
  const steps = [
    {
      id: "01",
      title: "Choose Base",
      description:
        "Select your favorite pizza base from our delicious options.",
      icon: "🍞",
    },
    {
      id: "02",
      title: "Choose Sauce",
      description:
        "Pick the sauce that perfectly matches your taste.",
      icon: "🥫",
    },
    {
      id: "03",
      title: "Choose Cheese",
      description:
        "Add your preferred cheese for a creamy experience.",
      icon: "🧀",
    },
    {
      id: "04",
      title: "Choose Vegetables",
      description:
        "Select fresh vegetables to complete your custom pizza.",
      icon: "🥦",
    },
  ];

  return (
    <section className="custom-pizza">

      <div className="custom-header">
        <span>Create Your Own Pizza</span>

        <h2>Build Your Pizza In 4 Easy Steps</h2>

        <p>
          Enjoy complete freedom by creating a pizza exactly the
          way you love it.
        </p>
      </div>

      <div className="steps-container">

        {steps.map((step) => (
          <div className="step-card" key={step.id}>

            <div className="step-number">
              {step.id}
            </div>

            <div className="step-icon">
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>

          </div>
        ))}

      </div>

      <div className="builder-btn">

        <Link to="/start-building">
          Start Building
        </Link>

      </div>

    </section>
  );
}