import { useNavigate } from "react-router-dom";
import "./notFound.css";

export default function NotFound() {

    const navigate = useNavigate();

    return (

        <div className="not-found-page">

            <div className="not-found-card">

                <div className="not-found-icon">
                    🍕
                </div>

                <p className="not-found-code">
                    404
                </p>

                <h1>
                    Page Not Found
                </h1>

                <p className="not-found-message">
                    Oops! The page you're looking for
                    doesn't exist or may have been moved.
                </p>

                <div className="not-found-actions">

                    <button
                        className="not-found-home-btn"
                        onClick={() => navigate("/")}
                    >
                        Go to Home
                    </button>

                    <button
                        className="not-found-back-btn"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>

                </div>

            </div>

        </div>

    );
}
