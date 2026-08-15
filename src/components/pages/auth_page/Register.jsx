import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { toast } from "react-toastify";
import LoadingPage from "../user_page/loading/LoadingPage";

export default function Register() {

    const url = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });


    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };

   const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
        return emailRegex.test(email);
    };


    const isValidPhone = (phone) => {

        const phoneRegex =
            /^[6-9]\d{9}$/;

        return phoneRegex.test(phone);

    };

    const isValidPassword = (password) => {

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        return passwordRegex.test(password);

    };


    const handleSubmit = async (event) => {

        event.preventDefault();


        const firstName =
            formData.firstName.trim();


        const lastName =
            formData.lastName.trim();


        const email =
            formData.email.trim();


        const phone =
            formData.phone.trim();


        const password =
            formData.password;


        const confirmPassword =
            formData.confirmPassword;

        if (!firstName) {

            toast.error(
                "Please enter your first name."
            );

            return;
        }

        if (!lastName) {

            toast.error(
                "Please enter your last name."
            );

            return;
        }


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

        if (!phone) {

            toast.error(
                "Please enter your phone number."
            );

            return;
        }


        if (!isValidPhone(phone)) {

            toast.error(
                "Please enter a valid 10-digit Indian mobile number."
            );

            return;
        }

        if (!password) {

            toast.error(
                "Please enter a password."
            );

            return;
        }


        if (!isValidPassword(password)) {

            toast.error(
                "Password must be at least 8 characters and contain uppercase, lowercase and a number."
            );

            return;
        }

        if (!confirmPassword) {

            toast.error(
                "Please confirm your password."
            );

            return;
        }


        if (password !== confirmPassword) {

            toast.error(
                "Passwords do not match."
            );

            return;
        }


        setLoading(true);


        try {

            const response = await fetch(
                `${url}/router/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        data: {
                            firstName,
                            lastName,
                            email,
                            phone,
                            password,
                            confirmPassword
                        }
                    }),

                    credentials: "include"
                }
            );


            const result =
                await response.json();


            console.log(result);


            if (response.ok) {

                toast.success(
                    result.message
                );


                navigate(
                    "/",
                    {
                        replace: true
                    }
                );

            } else {

                throw new Error(
                    result.message ||
                    "Registration failed."
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

        <div className="register-page">

            <div className="register-card">

                <h1>
                    Create Account
                </h1>


                <p>
                    Register to order your favourite pizza.
                </p>


                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="form-group">

                            <label>
                                First Name
                            </label>


                            <input
                                type="text"
                                name="firstName"
                                value={
                                    formData.firstName
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="First Name"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Last Name
                            </label>


                            <input
                                type="text"
                                name="lastName"
                                value={
                                    formData.lastName
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Last Name"
                                required
                            />

                        </div>

                    </div>
                    
                    <div className="form-group">

                        <label>
                            Email
                        </label>


                        <input
                            type="email"
                            name="email"
                            value={
                                formData.email
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Email"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Phone Number
                        </label>


                        <input
                            type="tel"
                            name="phone"
                            value={
                                formData.phone
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="10-digit phone number"
                            maxLength="10"
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
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Password"
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

                    <div className="form-group">

                        <label>
                            Confirm Password
                        </label>


                        <div className="password-box">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                value={
                                    formData.confirmPassword
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Confirm Password"
                                required
                            />


                            <button
                                type="button"
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

                    <button
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >

                        Create Account

                    </button>

                </form>

                <div className="login-link">

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

}
