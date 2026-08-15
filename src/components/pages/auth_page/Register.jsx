import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import {toast} from 'react-toastify';
import LoadingPage from "../user_page/loading/LoadingPage";

export default function Register() {
    const url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    let [loading,setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(formData.password !== formData.confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        console.log(formData);
        console.log(url);
        setLoading(true);

        try {
            let response = await fetch(`${url}/router/auth/register`, {
                method:"POST",
                headers:{
                    'Content-type' : "application/json",
                },
                body:JSON.stringify({data:formData}),
                credentials:'include'
            });
            let result = await response.json();
            console.log(result);
            if(response.status == 200) {
                toast.success(result.message);
                navigate('/',{ replace: true });
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if(loading) {
        return <LoadingPage />
    }

    return (

        <div className="register-page">

            <div className="register-card">

                <h1>Create Account</h1>

                <p>

                    Register to order your favourite pizza.

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="form-group">

                            <label>First Name</label>

                            <input

                                type="text"

                                name="firstName"

                                value={formData.firstName}

                                onChange={handleChange}

                                placeholder="First Name"

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Last Name</label>

                            <input

                                type="text"

                                name="lastName"

                                value={formData.lastName}

                                onChange={handleChange}

                                placeholder="Last Name"

                                required

                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            placeholder="Email"

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>Phone Number</label>

                        <input

                            type="text"

                            name="phone"

                            value={formData.phone}

                            onChange={handleChange}

                            placeholder="Phone Number"

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <div className="password-box">

                            <input

                                type={showPassword ? "text" : "password"}

                                name="password"

                                value={formData.password}

                                onChange={handleChange}

                                placeholder="Password"

                                required

                            />

                            <button

                                type="button"

                                onClick={() => setShowPassword(!showPassword)}

                            >

                                {showPassword ? "Hide" : "Show"}

                            </button>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <div className="password-box">

                            <input

                                type={showConfirmPassword ? "text" : "password"}

                                name="confirmPassword"

                                value={formData.confirmPassword}

                                onChange={handleChange}

                                placeholder="Confirm Password"

                                required

                            />

                            <button

                                type="button"

                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}

                            >

                                {showConfirmPassword ? "Hide" : "Show"}

                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="register-btn"
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