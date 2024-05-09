import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import RegisterPage from './auth/register/RegisterPage';
import LoginPage from "./auth/login/LoginPage";
import MainMenuPage from "./menu/MainMenuPage";
import {useLocalStorageService} from "./services/LocalStorageService";
import SettingsPage from "./settings/SettingsPage";
import PaymentStatusPage from "./payment/PaymentStatusPage";

function App() {
    const { hasValidToken } = useLocalStorageService();

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    hasValidToken() ? <Navigate replace to="/menu" /> : <Navigate replace to="/login" />
                } />
                <Route path="/login" element={
                    hasValidToken() ? <Navigate replace to="/menu" /> : <LoginPage />
                } />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/menu" element={<MainMenuPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/success" element={<PaymentStatusPage />} />
            </Routes>
        </Router>
    );
}

export default App;