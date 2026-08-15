import "./step.css";

export default function VegetableStep({
  vegetables,
  selectedVegetables,
  setSelectedVegetables,
  previousStep,
  nextStep,
}) {

  const handleSelect = (vegetable) => {

    const exists = selectedVegetables.find(
      (item) => item._id === vegetable._id
    );

    if (exists) {

      setSelectedVegetables(
        selectedVegetables.filter(
          (item) => item._id !== vegetable._id
        )
      );

    } else {

      setSelectedVegetables([
        ...selectedVegetables,
        vegetable,
      ]);

    }

  };

  return (

    <div className="step-container">

      <h2>Select Vegetables</h2>

      <p className="subtitle">

        Choose one or more vegetables.

      </p>

      <div className="option-grid">

        {vegetables.map((vegetable) => {

          const selected = selectedVegetables.some(
            (item) => item._id === vegetable._id
          );

          return (

            <div
              key={vegetable._id}
              className={
                selected
                  ? "option-card active-card"
                  : "option-card"
              }
              onClick={() => handleSelect(vegetable)}
            >

              <div className="option-header">

                <h3>{vegetable.name}</h3>

                <span>
                  + ₹{vegetable.price}
                </span>

              </div>

              <p>{vegetable.description}</p>

            </div>

          );

        })}

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
          onClick={nextStep}
        >
          Review Order →
        </button>

      </div>

    </div>

  );

}