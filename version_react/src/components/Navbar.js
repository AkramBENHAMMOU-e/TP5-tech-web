import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/ENSET-Mohammedia (1).png';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <Link to="/" className="logo-link">
                        <div className="logo">
                             <img src={logo} alt="Logo"/>
                        </div>
                    </Link>
                </div>
                
                <div className="navbar-menu">
                    {user ? (
                        <div className="user-section">
                            <span className="welcome-message">Bienvenue, {user.name || user.email}</span>
                            <button onClick={logout} className="logout-btn">
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="nav-link">Connexion</Link>
                            <Link to="/signup" className="signup-link">Inscription</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;