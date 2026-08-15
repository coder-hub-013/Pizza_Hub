import "./stepIndicator.css";

export default function StepIndicator({ currentStep }) {
  const steps = [
    "Base",
    "Sauce",
    "Cheese",
    "Vegetables",
    "Summary",
  ];

  return (
    <div className="stepper">

      {steps.map((step, index) => (

        <div
          className="step-item"
          key={index}
        >

          <div
            className={
              currentStep === index + 1
                ? "step-circle active"
                : currentStep > index + 1
                ? "step-circle completed"
                : "step-circle"
            }
          >
            {currentStep > index + 1 ? "✓" : index + 1}
          </div>

          <p>{step}</p>

          {index !== steps.length - 1 && (
            <div
              className={
                currentStep > index + 1
                  ? "step-line completed-line"
                  : "step-line"
              }
            ></div>
          )}

        </div>

      ))}

    </div>
  );
}