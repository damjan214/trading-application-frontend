import {useEffect, useRef, useState} from "react";
import {RegisterValidators} from "../auth/register/RegisterValidators";
import {useApiService} from "../core/ApiService";
import {useApiAuth} from "../core/ApiAuth";

export function useSettingsHandlers() {
    const [activeMenu, setActiveMenu] = useState('account');
    const [userAvatarPreview, setUserAvatarPreview] = useState('');
    const [fileName, setFileName] = useState('');
    const [updateErrorMessage, setUpdateErrorMessage] = useState('');
    const [updatePasswordErrorMessage, setUpdatePasswordErrorMessage] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(false);
    const [updatePasswordError, setUpdatePasswordError] = useState(false);
    const [updateAvatarSuccess, setUpdateAvatarSuccess] = useState(false);
    const [showAlertInvalidPassword, setShowAlertInvalidPassword] = useState(false);
    const [showAlertMatchingPasswords, setShowAlertMatchingPasswords] = useState(false);
    const [file, setFile] = useState(null);
    const {
        getUserByToken,
        saveUserAvatar,
        updateUser,
        updatePassword,
        getUserAvatarByToken,
    } = useApiService();

    const {deleteUser} = useApiAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserByToken();
                if (response.status === 200) {
                    const {firstName, lastName, username, email, countryOfResidence} = response.data;
                    setAccountData({
                        firstName,
                        lastName,
                        username,
                        email,
                        countryOfResidence
                    });
                }
            } catch (error) {
                console.log(error.response?.data?.message || "An unknown error occurred");
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchUserAvatar = async () => {
            try {
                const response = await getUserAvatarByToken();
                const avatar = `data:image/jpeg;base64,${response.data}`;
                setUserAvatarPreview(avatar);
            } catch (err) {
                console.error('Failed to fetch user avatar:', err);
            }
        };

        fetchUserAvatar();
    }, []);

    const [accountData, setAccountData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        countryOfResidence: ''
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const {
        validatePassword,
        validateMatchingPasswords
    } = RegisterValidators();

    const handleAccountChange = (event) => {
        setAccountData({
            ...accountData,
            [event.target.name]: event.target.value
        });
    };

    const handlePasswordChange = (event) => {
        const {name, value} = event.target;
        setPasswordData(prev => ({...prev, [name]: value}));
    };

    const handlePasswordsChange = (event) => {
        validatePassword(event, setShowAlertInvalidPassword);
        handlePasswordChange(event);
    }

    const handleConfirmPasswordChange = (event) => {
        validateMatchingPasswords(event, passwordData.newPassword, setShowAlertMatchingPasswords);
        handlePasswordChange(event);
    }

    const fileInputRef = useRef(null);

    const handleSelectPhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUserAvatarPreview(URL.createObjectURL(file));
            setFileName(file.name);
            setFile(file);
        }
        console.log(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (activeMenu === 'account') {
            setUpdateSuccess(false);
            setUpdateError(false);
            updateUser(accountData).then(response => {
                if (response.status === 200) {
                    setUpdateSuccess(true);
                }
                else {
                    setUpdateError(true);
                    setUpdateErrorMessage(response.response.data.message);
                }
            }).catch(error => {
                console.log(error.response.data.message);
            });
        } else if (activeMenu === 'password') {
            setUpdatePasswordSuccess(false);
            setUpdatePasswordError(false);
            updatePassword(passwordData).then(response => {
                if (response.status === 200) {
                    setPasswordData({
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    })
                    setUpdatePasswordSuccess(true);
                }
                else {
                    setUpdatePasswordError(true);
                    setUpdatePasswordErrorMessage(response.response.data.message);
                }
            }).catch(error => {
                console.log(error.response.data.message);
            });
        } else {
            setUpdateAvatarSuccess(false);
            const formData = new FormData();
            formData.append('file', file);
            saveUserAvatar(formData).then(response => {
                if (response.status === 200) {
                    setUpdateAvatarSuccess(true);
                    setFileName('');
                    setFile(null);
                }
            }).catch(error => {
                console.log(error.response.data.message);
            });
        }
    };

    const handleDeleteUser = () => {
        deleteUser().then(response => {
            if (response.status === 200) {
                window.location.href = '/login';
            }
        }).catch(error => {
            console.log(error.response.data.message);
        });
    };

    return {
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
        updateErrorMessage,
        updateSuccess,
        setUpdateSuccess,
        updateError,
        setUpdateError,
        updatePasswordErrorMessage,
        updatePasswordSuccess,
        setUpdatePasswordSuccess,
        updatePasswordError,
        setUpdatePasswordError,
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
    }
}