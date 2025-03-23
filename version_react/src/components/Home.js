import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Tableau de bord</h1>
                <div className="dashboard-welcome">
                    <span>Bienvenue, {user.name || user.email}</span>
                </div>
            </div>
            
            <div className="dashboard-content">
                <div className="dashboard-card main-card">
                    <div className="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div className="card-content">
                        <h2>Profil d'utilisateur</h2>
                        <div className="user-info">
                            <div className="info-item">
                                <span className="info-label">Nom</span>
                                <span className="info-value">{user.name || "Non défini"}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Email</span>
                                <span className="info-value">{user.email}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Statut</span>
                                <span className="info-value status-active">Actif</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <div className="card-icon blue">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                            </svg>
                        </div>
                        <div className="card-content">
                            <h3>Activité</h3>
                            <p>Dernière connexion aujourd'hui</p>
                        </div>
                    </div>
                    
                    <div className="dashboard-card">
                        <div className="card-icon purple">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                        </div>
                        <div className="card-content">
                            <h3>Données</h3>
                            <p>0 fichiers stockés</p>
                        </div>
                    </div>
                    
                    <div className="dashboard-card">
                        <div className="card-icon green">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <div className="card-content">
                            <h3>Temps de session</h3>
                            <p>00:10:23</p>
                        </div>
                    </div>
                    
                    <div className="dashboard-card">
                        <div className="card-icon orange">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div className="card-content">
                            <h3>Compte vérifié</h3>
                            <p>Email vérifié avec succès</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;