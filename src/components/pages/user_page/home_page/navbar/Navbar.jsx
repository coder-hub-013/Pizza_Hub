import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import useAuth from "../../../../context/authContext/useAuth";
import { toast } from "react-toastify";
import Loader from "../../order/Loader";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, loading, error, logoutFunction } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const logout = async () => {
        const data = await logoutFunction();

        if (data?.success) {
            toast.success(data?.message || "Logout successful");
            navigate("/login");
            return;
        }

        toast.error(error?.message || "Unable to logout");
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    if (loading) {
        return <Loader />;
    }

    return (
        <header className="navbar-navbar">

            <div className="navbar-navbar-container">

                {/* Logo */}
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <span className="navbar-logo-icon">🍕</span>
                    <span className="navbar-logo-text">Pizza<span>Hub</span></span>
                </Link>


                {/* Desktop Navigation */}
                <nav className="navbar-nav-links">

                    <Link
                        to="/"
                        className={isActive("/") ? "active" : ""}
                    >
                        Home
                    </Link>

                    <Link
                        to="/menu"
                        className={isActive("/menu") ? "active" : ""}
                    >
                        Menu
                    </Link>

                    <Link
                        to="/cart"
                        className={`cart-link ${
                            isActive("/cart") ? "active" : ""
                        }`}
                    >
                        <span>🛒</span>
                        Cart
                    </Link>

                    {user && (
                        <>
                            <Link
                                to="/my-orders"
                                className={
                                    isActive("/my-orders") ? "active" : ""
                                }
                            >
                                My Orders
                            </Link>

                        </>
                    )}

                </nav>


                {/* Right Actions */}
                <div className="navbar-nav-actions">

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="navbar-login-btn"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="navbar-register-btn"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="navbar-user-section">

                            <div className="navbar-user-info">
                                <div className="navbar-user-avatar">
                                    {user?.name
                                        ? user.name.charAt(0).toUpperCase()
                                        : "U"}
                                </div>

                                <div className="navbar-user-name">
                                    <span>Welcome</span>
                                    <strong>
                                        {user?.name || "User"}
                                    </strong>
                                </div>
                            </div>

                            <button
                                className="navbar-logout-btn"
                                onClick={logout}
                            >
                                Logout
                            </button>

                        </div>
                    )}

                </div>


                {/* Mobile Menu Button */}
                <button
                    className="navbar-menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

            </div>


            {/* Mobile Navigation */}
            <div
                className={`mobile-menu ${
                    menuOpen ? "mobile-menu-open" : ""
                }`}
            >

                <Link
                    to="/"
                    className={isActive("/") ? "active" : ""}
                    onClick={closeMenu}
                >
                    🏠 Home
                </Link>

                <Link
                    to="/menu"
                    className={isActive("/menu") ? "active" : ""}
                    onClick={closeMenu}
                >
                    🍕 Menu
                </Link>

                <Link
                    to="/cart"
                    className={isActive("/cart") ? "active" : ""}
                    onClick={closeMenu}
                >
                    🛒 Cart
                </Link>

                {user && (
                    <>
                        <Link
                            to="/my-orders"
                            className={
                                isActive("/my-orders") ? "active" : ""
                            }
                            onClick={closeMenu}
                        >
                            📦 My Orders
                        </Link>

                        <button
                            className="navbar-mobile-logout"
                            onClick={() => {
                                closeMenu();
                                logout();
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}

                {!user && (
                    <div className="navbar-mobile-auth">

                        <Link
                            to="/login"
                            className="navbar-mobile-login"
                            onClick={closeMenu}
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="navbar-mobile-register"
                            onClick={closeMenu}
                        >
                            Register
                        </Link>

                    </div>
                )}

            </div>

        </header>
    );
}