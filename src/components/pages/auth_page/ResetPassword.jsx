import { useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import "./resetPassword.css";



const ResetPassword = () => {

    const url = import.meta.env.VITE_API_URL;

    const { token } =
        useParams();

    const navigate =
        useNavigate();

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!password) {
            setError(
                "Please enter a password"
            );
            return;
        }

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters"
            );
            return;
        }

        if (
            password !==
            confirmPassword
        ) {
            setError(
                "Passwords do not match"
            );
            return;
        }

        try {

            setLoading(true);

            const response =
                await fetch(
                    `${url}/router/auth/reset-password/${token}`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            password,
                        }),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Password reset failed"
                );
            }

            setSuccess(
                data.message
            );

            /*
            Redirect after successful reset
            */

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {

            setError(
                error.message
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="reset-password-page">

            <div className="reset-password-card">

                <div className="reset-password-header">

                    <div className="reset-password-icon">
                        🔐
                    </div>

                    <h1>
                        Reset Password
                    </h1>

                    <p>
                        Create a new password for your
                        account. Make sure it is secure
                        and easy for you to remember.
                    </p>


                </div>

                <form
                    className="reset-password-form"
                    onSubmit={handleSubmit}
                >

                    <div className="password-field">

                        <label htmlFor="password">
                            New Password
                        </label>

                        <div className="password-input-wrapper">

                            <span className="password-input-icon">
                                🔒
                            </span>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                autoComplete="new-password"
                            />

                        </div>

                    </div>


                    <div className="password-field">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <div className="password-input-wrapper">

                            <span className="password-input-icon">
                                🔒
                            </span>

                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                autoComplete="new-password"
                            />

                        </div>

                    </div>


                    <div className="password-requirement">
                        <span>•</span>
                        Password must be at least 6 characters
                    </div>


                    {error && (
                        <div className="reset-message reset-error">
                            <span>⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}


                    {success && (
                        <div className="reset-message reset-success">
                            <span>✓</span>
                            <p>{success}</p>
                        </div>
                    )}


                    <button
                        type="submit"
                        className="reset-password-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="reset-spinner"></span>
                                Updating Password...
                            </>
                        ) : (
                            <>
                                Reset Password
                                <span>→</span>
                            </>
                        )}
                    </button>

                </form>


                <div className="reset-password-footer">

                    <span>
                        Remember your password?
                    </span>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </button>

                </div>

            </div>

        </div>
    );

    // return (
    //     <div className="reset-password-page">

    //         <div className="reset-password-card">

    //             <h1>
    //                 Reset Password
    //             </h1>

    //             <p>
    //                 Create a new password
    //                 for your account.
    //             </p>

    //             <form
    //                 onSubmit={handleSubmit}
    //             >

    //                 <input
    //                     type="password"
    //                     placeholder="New password"
    //                     value={password}
    //                     onChange={(e) =>
    //                         setPassword(
    //                             e.target.value
    //                         )
    //                     }
    //                 />

    //                 <input
    //                     type="password"
    //                     placeholder="Confirm password"
    //                     value={
    //                         confirmPassword
    //                     }
    //                     onChange={(e) =>
    //                         setConfirmPassword(
    //                             e.target.value
    //                         )
    //                     }
    //                 />

    //                 {error && (
    //                     <p className="error">
    //                         {error}
    //                     </p>
    //                 )}

    //                 {success && (
    //                     <p className="success">
    //                         {success}
    //                     </p>
    //                 )}

    //                 <button
    //                     type="submit"
    //                     disabled={loading}
    //                 >
    //                     {loading
    //                         ? "Updating..."
    //                         : "Reset Password"}
    //                 </button>

    //             </form>

    //         </div>

    //     </div>
    // );
};

export default ResetPassword;