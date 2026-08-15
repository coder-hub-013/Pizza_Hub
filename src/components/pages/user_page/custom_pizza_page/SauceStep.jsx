import "./step.css";

export default function SauceStep({
  sauces,
  selectedSauce,
  setSelectedSauce,
  nextStep,
  previousStep,
}) {

  return (
    <div className="step-container">

      <h2>Select Pizza Sauce</h2>

      <p className="subtitle">
        Choose one sauce for your pizza.
      </p>

      <div className="option-grid">

        {sauces.map((sauce) => (

          <div
            key={sauce._id}
            className={
              selectedSauce?._id === sauce._id
                ? "option-card active-card"
                : "option-card"
            }
            onClick={() => setSelectedSauce(sauce)}
          >

            <div className="option-header">

              <h3>{sauce.name}</h3>

              <span>
                {sauce.price === 0
                  ? "Included"
                  : `+ ₹${sauce.price}`}
              </span>

            </div>

            <p>{sauce.description}</p>

          </div>

        ))}

      </div>

      <div className="navigation">

        <button
          className="back-btn"
          onClick={previousStep}
        >
          ← Previous
        </button>

        <button
          className="next-btn"
          disabled={!selectedSauce}
          onClick={nextStep}
        >
          Next →
        </button>

      </div>

    </div>
  );
}