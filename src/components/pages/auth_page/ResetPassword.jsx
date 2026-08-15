import { useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import "./resetPassword.css";


const ResetPassword = () => {

    const url = import.meta.env.VITE_API_URL;

    const { token } = useParams();

    const navigate = useNavigate();


    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");


    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const isValidPassword = (password) => {

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        return passwordRegex.test(password);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();


        setError("");

        setSuccess("");

        if (!password) {

            setError(
                "Please enter a new password."
            );

            return;
        }

        if (!isValidPassword(password)) {

            setError(
                "Password must be at least 8 characters and contain uppercase, lowercase and a number."
            );

            return;
        }

        if (!confirmPassword) {

            setError(
                "Please confirm your password."
            );

            return;
        }

        if (
            password !==
            confirmPassword
        ) {

            setError(
                "Passwords do not match."
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
                    "Password reset failed."
                );

            }


            setSuccess(
                data.message ||
                "Password reset successfully."
            );

            setPassword("");

            setConfirmPassword("");


            setTimeout(() => {

                navigate(
                    "/login",
                    {
                        replace: true
                    }
                );

            }, 2000);


        } catch (error) {

            console.error(
                error
            );


            setError(
                error.message ||
                "Something went wrong."
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
                        Create a new password for
                        your account. Make sure it
                        is secure and easy for you
                        to remember.
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
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                autoComplete="new-password"
                                required
                            />


                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >

                                {
                                    showPassword
                                        ? "Hide"
                                        : "Show"
                                }

                            </button>

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
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm your password"
                                value={
                                    confirmPassword
                                }
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                autoComplete="new-password"
                                required
                            />


                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >

                                {
                                    showConfirmPassword
                                        ? "Hide"
                                        : "Show"
                                }

                            </button>

                        </div>

                    </div>

                    <div className="password-requirement">

                        <span>
                            •
                        </span>

                        Password must contain at least
                        8 characters, one uppercase
                        letter, one lowercase letter
                        and one number.

                    </div>

                    {error && (

                        <div className="reset-message reset-error">

                            <span>
                                ⚠️
                            </span>

                            <p>
                                {error}
                            </p>

                        </div>

                    )}

                    {success && (

                        <div className="reset-message reset-success">

                            <span>
                                ✓
                            </span>

                            <p>
                                {success}
                            </p>

                        </div>

                    )}

                    <button
                        type="submit"
                        className="reset-password-button"
                        disabled={loading}
                    >

                        {loading ? (

                            <>

                                <span className="reset-spinner">
                                </span>

                                Updating Password...

                            </>

                        ) : (

                            <>

                                Reset Password

                                <span>
                                    →
                                </span>

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
                        onClick={() =>
                            navigate("/login")
                        }
                    >

                        Back to Login

                    </button>

                </div>


            </div>

        </div>

    );

};


export default ResetPassword;
