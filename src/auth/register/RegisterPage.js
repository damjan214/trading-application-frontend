import React from 'react';
import {countries} from 'countries-list';
import signUp from '../../images/SignUp.png';
import {useRegisterHandlers} from "./RegisterHandlers";

function RegisterPage() {

    const {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
        countryOfResidence,
        showAlertInvalidPassword,
        showAlertMatchingPasswords,
        registerSuccess,
        registerError,
        registerErrorMessage,
        handleChange,
        handleRegister,
        handleLogin,
        handlePasswordsChange,
        handleConfirmPasswordChange,
    } = useRegisterHandlers();

    return (
        <div className="d-flex" style={{backgroundColor: 'FEFEFE'}}>
            <div className="container ms-5" style={{flex: 1, alignContent: "center"}}>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="firstName"
                               className="form-label mb-2 text-uppercase fw-bold fs-4 align-content-lg-center d-block">First
                            name</label>
                        <input
                            type="text"
                            className="form-control w-75"
                            id="firstName"
                            name="firstName"
                            placeholder={"Enter your first name"}
                            value={firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName"
                               className="form-label mb-2 text-uppercase fw-bold fs-4 align-content-lg-center d-block">Last
                            name</label>
                        <input
                            type="text"
                            className="form-control w-75"
                            id="lastName"
                            name="lastName"
                            placeholder={"Enter your last name"}
                            value={lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username"
                               className="form-label mb-2 text-uppercase fw-bold fs-4 align-content-lg-center d-block">Username</label>
                        <input
                            type="text"
                            className="form-control w-75"
                            id="username"
                            name="username"
                            placeholder={"Enter your username"}
                            value={username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"
                               className="form-label mb-2 text-uppercase fw-bold fs-4 align-content-lg-center d-block">Email</label>
                        <input
                            type="email"
                            className="form-control w-75"
                            id="email"
                            name="email"
                            placeholder={"Enter your email"}
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"
                               className="form-label mb-2 text-uppercase fw-bold fs-4 align-content-lg-center d-block">Password</label>
                        <input
                            type="password"
                            className="form-control w-75"
                            id="password"
                            name="password"
                            placeholder={"Enter your password"}
                            value={password}
                            onChange={handlePasswordsChange}
                            required
                        />
                    </div>
                    {showAlertInvalidPassword && (
                        <div className="alert alert-danger w-75" role="alert"
                             style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                            Password must contain at least 8 characters, one uppercase, one lowercase, one number and
                            one special character!
                        </div>
                    )}
                    {showAlertMatchingPasswords && (
                        <div className="alert alert-danger w-75" role="alert"
                             style={{fontSize: '0.8rem', padding: '5px 10px'}}>

                            The passwords do not match!
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="confirmPassword"
                               className="form-label mb-2 text-uppercase fw-bold fs-4 align-content-lg-center d-block">Confirm
                            Password</label>
                        <input
                            type="password"
                            className="form-control w-75"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder={"Confirm your password"}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="countryOfResidence"
                               className="form-label mb-2 text-uppercase fw-bold fs-4 align-content-lg-center d-block">Country
                            of Residence</label>
                        <select
                            className="form-control w-75"
                            id="countryOfResidence"
                            name="countryOfResidence"
                            value={countryOfResidence}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a country</option>
                            {Object.entries(countries).map(([code, country]) => (
                                <option key={code} value={code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <div className="form-group mt-2">
                            <button type="submit" className="btn btn-primary w-75 mb-2 fw-bold">Register</button>
                            {registerSuccess && (
                                <div
                                    className="alert alert-success mt-2 d-flex justify-content-between align-items-center w-75"
                                    role="alert"
                                    style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                                    <span
                                        className='align-items-center'>{'Registration successful. Please log in.'}</span>
                                </div>
                            )}
                            {registerError && (
                                <div
                                    className="alert alert-danger mt-2 d-flex justify-content-between align-items-center w-75"
                                    role="alert"
                                    style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                                    <span
                                        className='align-items-center'>{registerErrorMessage}</span>
                                </div>
                            )}

                            <button type="button" className="btn btn-secondary w-75 fw-bold" onClick={handleLogin}>Back
                                to login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div style={{flex: 1}}>
                <img src={signUp} alt="Sign Up" style={{width: '100%', maxHeight: '911px'}}/>
            </div>
        </div>
    );
}

export default RegisterPage;