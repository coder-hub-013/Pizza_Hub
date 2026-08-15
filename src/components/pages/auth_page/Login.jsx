import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import useAuth from "../../context/authContext/useAuth";
import LoadingPage from "../user_page/loading/LoadingPage";

export default function Login() {

    const { setUser } = useAuth();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };


    const isValidEmail = (email) => {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);

    };

    const handleSubmit = async (event) => {

        event.preventDefault();


        const email =
            formData.email.trim();


        const password =
            formData.password;

        if (!email) {

            toast.error(
                "Please enter your email."
            );

            return;
        }

        if (!isValidEmail(email)) {

            toast.error(
                "Please enter a valid email address."
            );

            return;
        }

        if (!password) {

            toast.error(
                "Please enter your password."
            );

            return;
        }


        setLoading(true);


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/router/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        data: {
                            email,
                            password
                        }
                    }),

                    credentials: "include"
                }
            );


            const result =
                await response.json();


            if (response.ok) {

                toast.success(
                    result.message
                );


                setUser({
                    role: result.role
                });


                if (result?.role === "ADMIN") {

                    navigate(
                        "/admin/dashboard",
                        {
                            replace: true
                        }
                    );

                } else {

                    navigate(
                        "/",
                        {
                            replace: true
                        }
                    );

                }

            } else {

                throw new Error(
                    result.message ||
                    "Login failed."
                );
            }


        } catch (error) {

            console.error(
                error
            );


            toast.error(
                error.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return <LoadingPage />;

    }


    return (

        <div className="login-page">

            <div className="login-card">

                <h1>
                    Welcome Back
                </h1>


                <p>
                    Login to continue ordering
                    delicious pizzas.
                </p>


                <form
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Email
                        </label>


                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Password
                        </label>


                        <div className="password-box">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Enter your password"
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />


                            <button
                                type="button"
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

                    <div className="login-options">

                        <Link to="/forgot-password">

                            Forgot Password?

                        </Link>

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                        disabled={loading}
                    >

                        Login

                    </button>

                </form>

                <div className="register-link">

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );
}
