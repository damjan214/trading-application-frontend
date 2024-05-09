import React from 'react';
import {useLoginHandlers} from './LoginHandlers';
import worldOfStocks from '../../images/WorldOfStocks.png';

function LoginPage() {
    const {
        username,
        handleUsernameChange,
        password,
        handlePasswordChange,
        loginFailed,
        handleLogin,
        handleCloseAlert
    } = useLoginHandlers();

    return (
        <div style={{backgroundColor: '#e9f6f8', minHeight: '100vh'}}
             className="d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="text-center">
                    <img
                        src={worldOfStocks}
                        alt="World of Stocks Logo"
                        className="img-fluid"
                        style={{maxWidth: '400px'}}
                    />
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleLogin} className="text-center">
                            <div className="mb-2 d-flex align-items-center">
                                <i className="fas fa-user" style={{marginRight:'6px'}}></i>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                            </div>
                            <div className="mb-2 d-flex align-items-center">
                                <i className="fas fa-lock" style={{marginRight: '6px'}}></i>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            {loginFailed && (
                                <div
                                    className="alert alert-danger mt-3 d-flex justify-content-between align-items-center"
                                    role="alert">
                                    <span>{'Failed to process login. Invalid username or password.'}</span>
                                    <button type="button" className="btn-close"
                                            aria-label="Close"
                                            onClick={handleCloseAlert}>
                                    </button>
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary w-100 mb-2"><b>Log In</b></button>
                            <div>
                                <a href="/register" className="link-primary fs-6 text-decoration-underline">Don't
                                    already have an account? Sign up now!</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;