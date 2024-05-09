import React from 'react';
import {NavLink} from 'react-router-dom';
import worldOfStocksLogo from "../images/WorldOfStocks.png";
import {useMainMenuHandlers} from './MainMenuHandlers';
import {Dropdown} from "bootstrap";

function MainMenuPage() {
    const {
        funds,
        fundsLabel,
        userFirstName,
        userAvatar,
        handleFundsChange,
        handleDepositPayment,
        handleWithdrawPayment,
        handleLogout,
    } = useMainMenuHandlers();
    return (
        <>
            <nav className="navbar" style={{backgroundColor: '#e9f6f8', borderBottom: '1px solid black'}}>
                <div className="container-fluid justify-content-between">
                    <div className="d-flex align-items-center">
                        <NavLink to="/menu" className="navbar-brand text-white">
                            <img
                                src={worldOfStocksLogo}
                                alt="World of Stocks Logo"
                                className="img-fluid"
                                style={{maxWidth: '125px'}}
                            />
                        </NavLink>
                        <div className="ms-3 dropdown">
                            <button className="btn btn-secondary dropdown-toggle fw-bold" type="button"
                                    id="balanceDropdown" data-bs-toggle="dropdown" aria-expanded="true"
                                    style={{width: '230px'}}>
                                Balance: {fundsLabel} USD
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="balanceDropdown">
                                <li>
                                    <input
                                        type="number"
                                        className="text-center fw-bold me-1 ms-1"
                                        id="funds"
                                        value={funds}
                                        onChange={handleFundsChange}
                                        required
                                        placeholder="Enter amount"
                                    />
                                </li>
                                <li className="d-flex justify-content-between">
                                    <button className="btn btn-primary fw-bold mt-1 ms-1"
                                            onClick={handleDepositPayment}>Deposit
                                    </button>
                                    <button className="btn btn-secondary fw-bold mt-1 me-1"
                                            onClick={handleWithdrawPayment}>Withdraw
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="d-flex flex-column text-center navbar-nav">
                        <div className="">
                            <img
                                src={userAvatar}
                                alt="User avatar"
                                className="img-fluid rounded-circle mb-2"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    marginBottom: '10px'
                                }}
                            />
                        </div>
                        <label className="mb-1 fw-bold">{userFirstName}</label>
                        <NavLink to="/settings" className="nav-item nav-link d-flex align-items-center mb-2">
                            <i className="bi bi-gear-fill" style={{fontSize: '18px', marginRight: '4px'}}></i>
                            Account settings
                        </NavLink>
                        <NavLink to="/login" className="nav-item nav-link d-flex align-items-center"
                                 onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right" style={{fontSize: '18px', marginRight: '4px'}}></i>
                            Log out
                        </NavLink>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#e9f6f8', borderBottom:'1px solid black'}}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                        <div className="navbar-nav justify-content-center">
                            <NavLink className="nav-item nav-link" to="/watchlist">
                                <i className="bi bi-eye-fill"></i> My watchlist
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/top-winners">
                                <i className="bi bi-trophy-fill"></i> Top winners
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/top-losers">
                                <i className="bi bi-emoji-frown-fill"></i> Top losers
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/most-owned">
                                <i className="bi bi-person-fill"></i> Most owned
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default MainMenuPage;