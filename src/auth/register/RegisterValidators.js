export function RegisterValidators () {

    const validatePassword = (event, setShowAlertInvalidPassword) => {
        const password = event.target.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
        if (!regex.test(password) && password.length > 0) {
            setShowAlertInvalidPassword(true);
        } else setShowAlertInvalidPassword(false);
    }

    const validateMatchingPasswords = (event, formPassword, setShowAlertMatchingPasswords) => {
        const password = formPassword;
        const confirmPassword = event.target.value;
        if (password !== confirmPassword && confirmPassword.length > 0) {
            setShowAlertMatchingPasswords(true);
        } else setShowAlertMatchingPasswords(false);
    }

    return {
        validatePassword,
        validateMatchingPasswords
    };
}