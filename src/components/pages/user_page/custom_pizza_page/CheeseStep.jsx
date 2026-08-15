import './step.css'
export default function CheeseStep({
  cheeses,
  selectedCheese,
  setSelectedCheese,
  previousStep,
  nextStep,
}) {
  return (
    <div className="step-container">

      <h2>Select Cheese</h2>

      <p className="subtitle">
        Choose one cheese for your custom pizza.
      </p>

      <div className="option-grid">

        {cheeses.map((cheese) => (  

          <div
            key={cheese._id}
            className={
              selectedCheese?._id === cheese._id
                ? "option-card active-card"
                : "option-card"
            }
            onClick={() => setSelectedCheese(cheese)}
          >

            <div className="option-header">

              <h3>{cheese.name}</h3>

              <span>
                {cheese.price === 0
                  ? "Included"
                  : `+ ₹${cheese.price}`}
              </span>

            </div>

            <p>{cheese.description}</p>

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
          disabled={!selectedCheese}
          onClick={nextStep}
        >
          Next →
        </button>

      </div>

    </div>
  );
}