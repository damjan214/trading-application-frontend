import {useState} from "react";
import {useApiAuth} from "../../core/ApiAuth";
import {RegisterValidators} from "./RegisterValidators";
import {useNavigate} from "react-router-dom";

export function useRegisterHandlers() {

    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [registerErrorMessage, setRegisterErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: ''
    });

    const navigate = useNavigate();
    const {register} = useApiAuth();

    const {
        validatePassword,
        validateMatchingPasswords
    } = RegisterValidators();

    const [showAlertInvalidPassword, setShowAlertInvalidPassword] = useState(false);
    const [showAlertMatchingPasswords, setShowAlertMatchingPasswords] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleRegister = (event) => {
        event.preventDefault();
        setRegisterError(false);
        setRegisterSuccess(false);
        register(formData).then(response => {
            if (response.status === 200) {
                setRegisterSuccess(true);
            }
            else {
                setRegisterError(true);
                setRegisterErrorMessage(response.response.data.message);
            }
        }).catch(error => {
            console.log(error.response.data.message);
        });
    };

    const handleLogin = () => {
        navigate('/login')
    }
    const handlePasswordsChange = (event) => {
        validatePassword(event, setShowAlertInvalidPassword);
        handleChange(event);
    }

    const handleConfirmPasswordChange = (event) => {
        validateMatchingPasswords(event, formData.password ,setShowAlertMatchingPasswords);
        handleChange(event);
    };

    return {
        formData, setFormData,
        showAlertInvalidPassword, setShowAlertInvalidPassword,
        showAlertMatchingPasswords, setShowAlertMatchingPasswords,
        registerSuccess, setRegisterSuccess,
        registerError, setRegisterError,
        registerErrorMessage, setRegisterErrorMessage,
        handleChange,
        handleRegister,
        handleLogin,
        handlePasswordsChange,
        handleConfirmPasswordChange,
    };
}