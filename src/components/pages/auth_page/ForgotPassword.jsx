import { useState } from "react";
import { Link } from "react-router-dom";
import "./forgotPassword.css";

export default function ForgotPassword() {
    const url = import.meta.env.VITE_API_URL;

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {

        event.preventDefault();
        setMessage("");
        setError("");

        if (!email.trim()) {
            setError(
                "Please enter your email"
            );
            return;
        }

        try {

            setLoading(true);

            const response =
                await fetch(
                    `${url}/router/auth/forgot-password`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                        },

                        body: JSON.stringify({
                            email: email.trim(),
                        }),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to send reset link"
                );
            }

            setMessage(
                data.message
            );

        } catch (error) {
            console.log(error)
            setError(
                error.message
            );

        } finally {

            setLoading(false);
        }

    };

    return (

        <div className="forgot-page">

            <div className="forgot-card">

                <h1>

                    Forgot Password

                </h1>

                <p>

                    Enter your registered email address.
                    We'll send you a password reset link.

                </p>

                <form
                    onSubmit={handleSubmit}
                >

                    <label>

                        Email Address

                    </label>

                    <input

                        type="email"

                        placeholder="Enter your email"

                        value={email}

                        onChange={(event) =>
                            setEmail(event.target.value)
                        }

                        required

                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        Send Reset Link

                    </button>

                </form>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {

                    message && (

                        <div className="success">

                            {message}

                        </div>

                    )

                }

                <div className="back-login">

                    <Link to="/login">

                        ← Back To Login

                    </Link>

                </div>

            </div>

        </div>

    );

}