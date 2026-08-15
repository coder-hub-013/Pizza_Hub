import LoadingPage from "../loading/LoadingPage";
import "./step.css"

export default function BaseStep({
  selectedBase,
  setSelectedBase,
  nextStep,
  bases
}) {
  if(!bases) {
    return <LoadingPage></LoadingPage>
  }
  return (
    <div className="step-container">
      <h2>Select Pizza Base</h2>

      <p className="subtitle">
        Choose one pizza base for your custom pizza.
      </p>

      <div className="option-grid">

        {bases.map((base) => (

          <div
            key={base._id}
            className={
              selectedBase?._id === base._id
                ? "option-card active-card"
                : "option-card"
            }
            onClick={() => setSelectedBase(base)}
          >

            <div className="option-header">

              <h3>{base.name}</h3>

              <span>
                {base.price === 0
                  ? "Included"
                  : `+ ₹${base.price}`}
              </span>

            </div>

            <p>{base.description}Light, crispy and crunchy.</p>
            {/* <p>Light, crispy and crunchy.</p> */}

          </div>

        ))}

      </div>

      <div className="navigation">

        <button
          className="next-btn"
          disabled={!selectedBase}
          onClick={nextStep}
        >
          Next →
        </button>

      </div>

    </div>
  );
}