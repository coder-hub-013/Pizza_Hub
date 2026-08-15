import "./orderSummary.css";

export default function OrderSummary({
  selectedBase,
  selectedSauce,
  selectedCheese,
  selectedVegetables,
  previousStep,
  addToCart,
}) {

  const basePrice = selectedBase?.price || 0;
  const saucePrice = selectedSauce?.price || 0;
  const cheesePrice = selectedCheese?.price || 0;

  const vegetablesPrice = selectedVegetables.reduce(
    (total, vegetable) => total + vegetable.price,
    0
  );

  const customPrice = 49;

  const total =
    customPrice +
    basePrice +
    saucePrice +
    cheesePrice +
    vegetablesPrice;

  return (
    <div className="summary-page">

      <h2>Order Summary</h2>

      <div className="summary-card">

        <div className="summary-row">
          <span>Custom Price</span>
          <span>₹{customPrice}</span>
        </div>

        <div className="summary-row">
          <span>Pizza Base</span>
          <span>
            {selectedBase?.name}
            {" "}
            (+₹{basePrice})
          </span>
        </div>

        <div className="summary-row">
          <span>Sauce</span>
          <span>
            {selectedSauce?.name}
            {" "}
            (+₹{saucePrice})
          </span>
        </div>

        <div className="summary-row">
          <span>Cheese</span>
          <span>
            {selectedCheese?.name}
            {" "}
            (+₹{cheesePrice})
          </span>
        </div>

        <div className="vegetable-section">

          <h3>Vegetables</h3>

          {
            selectedVegetables.length === 0
            ?
            (
              <p>No vegetables selected.</p>
            )
            :
            (
              selectedVegetables.map((item) => (

                <div
                  key={item._id}
                  className="summary-row"
                >
                  <span>{item.name}</span>

                  <span>
                    +₹{item.price}
                  </span>

                </div>

              ))
            )
          }

        </div>

        <hr />

        <div className="grand-total">

          <span>Total Amount</span>

          <span>
            ₹{total}
          </span>

        </div>

      </div>

      <div className="summary-buttons">

        <button
          className="back-btn"
          onClick={previousStep}
        >
          ← Previous
        </button>

        <button
          className="cart-btn"
          onClick={() => addToCart(total)}
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}