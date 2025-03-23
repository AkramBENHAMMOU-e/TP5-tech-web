import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import '../App.css'; // Shared styles for auth components

const Signup = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validation du formulaire
        if (userData.password !== userData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }

        try {
            // Suppression de confirmPassword avant l'envoi
            const { confirmPassword, ...userToRegister } = userData;
            const user = await registerUser(userToRegister);
            login(user);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <h1>Créez votre compte</h1>
            </div>
            
            <div className="auth-form">
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                            placeholder="Votre nom complet"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                            placeholder="exemple@email.com"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                            placeholder="Minimum 6 caractères"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="6"
                            placeholder="Retapez votre mot de passe"
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                    </button>
                </form>
                <div className="auth-redirect">
                    Déjà un compte? <a href="/login">Connectez-vous</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;