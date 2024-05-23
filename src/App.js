import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import RegisterPage from './auth/register/RegisterPage';
import LoginPage from "./auth/login/LoginPage";
import {useLocalStorageService} from "./services/LocalStorageService";
import SettingsPage from "./settings/SettingsPage";
import PaymentStatusPage from "./payment/PaymentStatusPage";
import StocksPage from "./stocks/StocksPage";
import SearchPage from "./search/SearchPage";
import PortfolioPage from "./portfolio/PortfolioPage";

function App() {
    const { hasValidToken } = useLocalStorageService();

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    hasValidToken() ? <Navigate replace to="/stocks" /> : <Navigate replace to="/login" />
                } />
                <Route path="/login" element={
                    hasValidToken() ? <Navigate replace to="/stocks" /> : <LoginPage />
                } />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/success" element={<PaymentStatusPage />} />
                <Route path="/stocks" element={<StocksPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </Router>
    );
}

export default App;