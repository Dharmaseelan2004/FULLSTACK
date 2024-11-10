import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from 'react-toastify';
import logo from "../images/logo.png";

const Navbar = () => {
    const navRef = useRef(null);
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const showNavbar = () => {
        if (navRef.current) {
            navRef.current.classList.toggle("responsive_nav");
        }
    };

    const handleClick = () => {
        logout();
        toast.success('Logged out');
    };

    const renderLinks = () => {
        if (user) {
            return (
                <>
                    <NavLink to='/' onClick={showNavbar} className={({ isActive }) => (isActive ? "active" : "")}>Pans&More</NavLink>
                    <NavLink to='/home' onClick={showNavbar} className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
                    <NavLink to='/create' onClick={showNavbar} className={({ isActive }) => (isActive ? "active" : "")}>New recipe</NavLink>
                    <NavLink to="/search" onClick={showNavbar} className={({ isActive }) => (isActive ? "active" : "")}>Search</NavLink>
                    <NavLink to={`/${user.user._id}/profile`} onClick={showNavbar} className={({ isActive }) => (isActive ? "active" : "")}>My Profile</NavLink>
                </>
            );
        } else {
            return (
                <>
                    <NavLink to='/' className={({ isActive }) => (isActive ? "active" : "")}>Pans&More</NavLink>
                    <NavLink to='/login' className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>
                    <NavLink to='/signup' className={({ isActive }) => (isActive ? "active" : "")}>Signup</NavLink>
                </>
            );
        }
    };

    return (
        <header>
            <nav ref={navRef}>
                <img src={logo} alt="Pans&More Logo" />
                {renderLinks()}
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes aria-label="Close navigation" />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars aria-label="Open navigation" />
            </button>
            {user &&
                <div className="user-info-nav">
                    <span>{user.user.username}</span>
                    <button onClick={handleClick}>Logout</button>
                </div>
            }
        </header>
    );
};

export default Navbar;
