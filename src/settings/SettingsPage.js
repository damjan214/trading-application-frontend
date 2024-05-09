import React from 'react';
import {useMainMenuHandlers} from '../menu/MainMenuHandlers';
import MainMenuPage from "../menu/MainMenuPage";
import {useSettingsHandlers} from "./SettingsHandlers";
import {countries} from "countries-list";

function SettingsPage(){

    const {
        activeMenu,
        setActiveMenu,
        accountData,
        passwordData,
        showAlertInvalidPassword,
        showAlertMatchingPasswords,
        fileInputRef,
        fileName,
        file,
        userAvatarPreview,
        updateSuccess,
        setUpdateSuccess,
        updateError,
        setUpdateError,
        updateErrorMessage,
        updatePasswordSuccess,
        setUpdatePasswordSuccess,
        updatePasswordError,
        setUpdatePasswordError,
        updatePasswordErrorMessage,
        updateAvatarSuccess,
        setUpdateAvatarSuccess,
        handleAccountChange,
        handlePasswordChange,
        handlePasswordsChange,
        handleConfirmPasswordChange,
        handleSubmit,
        handleSelectPhoto,
        handleFileChange,
        handleDeleteUser,
    } = useSettingsHandlers();

    const {
        funds,
        fundsLabel,
        userFirstName,
        handleFundsChange,
        handleDepositPayment,
        handleWithdrawPayment,
        handleLogout,
    } = useMainMenuHandlers();

    return (
        <>
            <MainMenuPage
                userFirstName={userFirstName}
                fundsLabel={fundsLabel}
                funds={funds}
                handleFundsChange={handleFundsChange}
                handleDepositPayment={handleDepositPayment}
                handleWithdrawPayment={handleWithdrawPayment}
                handleLogout={handleLogout}
            />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3 border-end">
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item mb-2">
                                <a href="#" className={`nav-link ${activeMenu === 'account' ? 'active' : ''}`}
                                   onClick={() => {setActiveMenu('account'); setUpdateSuccess(false); setUpdateError(false)}}>
                                    My Account
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="#" className={`nav-link ${activeMenu === 'password' ? 'active' : ''}`}
                                   onClick={() => {setActiveMenu('password'); setUpdatePasswordSuccess(false); setUpdatePasswordError(false)}}>
                                    Privacy & Security
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="#" className={`nav-link ${activeMenu === 'avatar' ? 'active' : ''}`}
                                   onClick={() => {setActiveMenu('avatar'); setUpdateAvatarSuccess(false)}}>
                                    Profile Picture
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="#" className={`nav-link ${activeMenu === 'delete' ? 'active' : ''}`}
                                      onClick={() => setActiveMenu('delete')}>
                                    Delete Account
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        {activeMenu === 'account' ? (
                            <form onSubmit={handleSubmit}>
                                {Object.entries(accountData).filter(([key]) => key !== 'countryOfResidence').map(([key, value]) => (
                                    <div key={key} className="mb-3">
                                        <label htmlFor={key} className="form-label">
                                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                        </label>
                                        <input
                                            type={key === 'email' ? 'email' : 'text'}
                                            className="form-control"
                                            id={key}
                                            name={key}
                                            value={value}
                                            onChange={handleAccountChange}
                                            placeholder={`Enter ${key}`}
                                            required
                                        />
                                    </div>
                                ))}

                                <div className="mb-3">
                                    <label htmlFor="countryOfResidence" className="form-label">Country of
                                        Residence</label>
                                    <select
                                        className="form-control"
                                        id="countryOfResidence"
                                        name="countryOfResidence"
                                        value={accountData.countryOfResidence}
                                        onChange={handleAccountChange}
                                        required
                                    >
                                        <option value="">Select a country</option>
                                        {Object.entries(countries).map(([code, {name}]) => (
                                            <option key={code} value={code}>{name}</option>
                                        ))}
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                {updateSuccess && (
                                    <div
                                        className="alert alert-success mt-2 d-flex justify-content-between align-items-center"
                                        role="alert"
                                        style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                                    <span
                                        className='align-items-center'>{'Update successful!'}</span>
                                    </div>
                                )}
                                {updateError && (
                                    <div
                                        className="alert alert-danger mt-2 d-flex justify-content-between align-items-center"
                                        role="alert"
                                        style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                                    <span
                                        className='align-items-center'>{updateErrorMessage}</span>
                                    </div>
                                )}
                            </form>
                        ) : activeMenu === 'password' ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="oldPassword" className="form-label">Old Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="oldPassword"
                                            name="oldPassword"
                                            value={passwordData.oldPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Enter old password"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control mb-3"
                                            id="newPassword"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordsChange}
                                            placeholder="Enter new password"
                                            required
                                        />
                                        {showAlertInvalidPassword && (
                                            <div className="alert alert-danger" role="alert"
                                                 style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                                                Password must contain at least 8 characters, one uppercase, one
                                                lowercase, one number and
                                                one special character!
                                            </div>
                                        )}
                                        {showAlertMatchingPasswords && (
                                            <div className="alert alert-danger" role="alert"
                                                 style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                                                The passwords do not match!
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        placeholder="Confirm new password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Password</button>
                                {updatePasswordSuccess && (
                                    <div
                                        className="alert alert-success mt-2 d-flex justify-content-between align-items-center"
                                        role="alert"
                                        style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                                    <span
                                        className='align-items-center'>{'Update successful!'}</span>
                                    </div>
                                )}
                                {updatePasswordError && (
                                    <div
                                        className="alert alert-danger mt-2 d-flex justify-content-between align-items-center"
                                        role="alert"
                                        style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                                    <span
                                        className='align-items-center'>{updatePasswordErrorMessage}</span>
                                    </div>
                                )}
                            </form>
                        ) : activeMenu === 'avatar' ? (
                            <div className="d-flex flex-column align-items-center mt-3">
                                <div className="position-relative flex-column justify-content-center">
                                    <img
                                        src={userAvatarPreview}
                                        alt="User avatar"
                                        className="img-fluid rounded-circle mb-2"
                                        style={{
                                            width: '300px',
                                            height: '300px',
                                            borderRadius: '50%',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="d-none"
                                        accept="image/*"
                                    />
                                    <div className="d-flex flex-column justify-content-center">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={handleSelectPhoto}
                                        >
                                            Select a photo
                                        </button>
                                        <span className="text-center mt-2">{fileName || "No photo selected"}</span>
                                        <button
                                            className="btn btn-primary mt-2"
                                            onClick={handleSubmit}
                                            disabled={!file}
                                        >
                                            Save
                                        </button>
                                        {updateAvatarSuccess && (
                                            <div
                                                className="alert alert-success mt-2 d-flex justify-content-between align-items-center"
                                                role="alert"
                                                style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                                    <span
                                        className='align-items-center'>{'New photo saved!'}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : activeMenu === 'delete' ? (
                            <div className="d-flex flex-column align-items-center mt-3">
                                <div className="alert alert-danger text-center w-75"
                                     style={{fontSize: '1rem', padding: '10px'}}>
                                    <strong>Are you sure you want to delete this account?</strong>
                                </div>
                                <button
                                    className="btn btn-danger btn-lg"
                                    onClick={handleDeleteUser}
                                >
                                    Yes, delete my account
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}
export default SettingsPage;