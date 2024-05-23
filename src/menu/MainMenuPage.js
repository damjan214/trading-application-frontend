import React from 'react';
import {NavLink} from 'react-router-dom';
import worldOfStocksLogo from "../images/WorldOfStocks.png";
import {useMainMenuHandlers} from './MainMenuHandlers';
import {Dropdown} from "bootstrap";

function MainMenuPage() {
    const {
        funds,
        setFunds,
        fundsLabel,
        userAvatar,
        showDeposit,
        showWithdraw,
        setShowDeposit,
        setShowWithdraw,
        withdrawError,
        setWithdrawError,
        handleFundsChange,
        handleDepositPayment,
        handleWithdrawPayment,
        handleLogout,
    } = useMainMenuHandlers();
    return (
        <>
            <nav className="navbar" style={{backgroundColor: '#e9f6f8'}}>
                <div className="container-fluid justify-content-between">
                    <div className="d-flex align-items-center">
                        <NavLink to="/stocks" className="navbar-brand text-white">
                            <img
                                src={worldOfStocksLogo}
                                alt="World of Stocks Logo"
                                className="img-fluid"
                                style={{maxWidth: '125px'}}
                            />
                        </NavLink>
                        <div className="ms-3 dropdown" style={{marginBottom: '50px'}}>
                            <button className="btn btn-secondary dropdown-toggle fw-bold" type="button"
                                    id="balanceDropdown" data-bs-toggle="dropdown" aria-expanded="true"
                                    style={{width: '230px'}}>
                                Balance available: {fundsLabel} $
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="balanceDropdown">
                                <li className="">
                                    <ul className='nav nav-pills justify-content-between row'>
                                        <li className="nav-item">
                                            <a href="#"
                                               className='nav-link text-center'
                                               onClick={() => {
                                                   setShowDeposit(true)
                                               }}>
                                                Deposit
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#"
                                               className='nav-link text-center'
                                               onClick={() => {
                                                   setShowWithdraw(true)
                                               }}>
                                                Withdraw
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            {showDeposit && (
                                <div className="dropdown dropend">
                                    <div className="dropdown-menu show" aria-labelledby="balanceDropdown">
                                        <form className="p-2">
                                            <div className="mb-2">
                                                <label htmlFor="depositAmount" className="form-label fw-bold">Deposit
                                                    amount</label>
                                                <input type="text" className="form-control" id="depositAmount"
                                                       value={funds}
                                                       onChange={(event) => handleFundsChange(event, 'deposit', fundsLabel)}/>
                                            </div>
                                            <div className='justify-content-between'>
                                                <button type="submit" className="btn btn-primary"
                                                        onClick={handleDepositPayment}
                                                        disabled={funds === 0 || funds === ''}>Deposit
                                                </button>
                                                <button type="button" className="btn btn-secondary ms-5"
                                                        onClick={() => {
                                                            setShowDeposit(false)
                                                            setFunds(0)
                                                        }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                            {showWithdraw && (
                                <div className="dropdown dropend">
                                    <div className="dropdown-menu show" aria-labelledby="balanceDropdown">
                                        <form className="p-2">
                                            <div className="mb-2">
                                                <label htmlFor="depositAmount" className="form-label fw-bold">Withdraw
                                                    amount</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${withdrawError ? 'input-error' : ''}`}
                                                    id="depositAmount"
                                                    value={funds}
                                                    onChange={(event) => handleFundsChange(event, 'withdraw', fundsLabel)}
                                                />
                                            </div>
                                            <div className='justify-content-between'>
                                                <button type="submit" className="btn btn-primary"
                                                        onClick={handleWithdrawPayment}
                                                        disabled={funds === 0 || funds === '' || withdrawError === true}>Withdraw
                                                </button>
                                                <button type="button" className="btn btn-secondary ms-5"
                                                        onClick={() => {
                                                            setShowWithdraw(false)
                                                            setWithdrawError(false)
                                                            setFunds(0)
                                                        }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex flex-column text-center navbar-nav">
                        <div className="d-flex align-items-center">
                            <img
                                src={userAvatar}
                                className="img-fluid rounded-circle mb-2"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    marginTop: '10px'
                                }}
                            />
                        </div>
                        <NavLink to="/login" className="nav-item nav-link d-flex align-items-center"
                                 onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right" style={{fontSize: '14px', marginRight: '4px'}}></i>
                            Log out
                        </NavLink>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg"
                 style={{backgroundColor: '#e9f6f8', borderBottom: '5px solid #345B6F'}}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to="/stocks" className="nav-link nav-item" style={{fontSize: '1.5rem', marginRight:'20px'}}>
                                <i className="bi bi-house-door-fill"></i>
                            </NavLink>
                            <NavLink to="/portfolio" className="nav-link nav-item" style={{fontSize: '1.5rem', marginRight:'20px'}}>
                                <i className="bi bi-pie-chart-fill"></i>
                            </NavLink>
                            <NavLink to="/search" className="nav-link nav-item" style={{fontSize: '1.5rem', marginRight:'20px'}}>
                                <i className="bi bi-search"></i>
                            </NavLink>
                            <NavLink to="/settings" className="nav-link nav-item" style={{fontSize: '1.5rem', marginRight:'20px'}}>
                                <i className="bi bi-gear-fill"></i>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default MainMenuPage;