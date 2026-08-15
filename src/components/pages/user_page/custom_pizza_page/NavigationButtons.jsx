import "./navigationButtons.css";

export default function NavigationButtons({
  showPrevious = true,
  showNext = true,
  previousLabel = "← Previous",
  nextLabel = "Next →",
  onPrevious,
  onNext,
  disableNext = false,
  nextButtonType = "button",
}) {
  return (
    <div className="navigation-buttons">

      <div className="left-button">
        {showPrevious && (
          <button
            type="button"
            className="previous-btn"
            onClick={onPrevious}
          >
            {previousLabel}
          </button>
        )}
      </div>

      <div className="right-button">
        {showNext && (
          <button
            type={nextButtonType}
            className="next-btn"
            disabled={disableNext}
            onClick={onNext}
          >
            {nextLabel}
          </button>
        )}
      </div>

    </div>
  );
}