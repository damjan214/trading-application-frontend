import {useState} from "react";
import {useApiAuth} from "../../core/ApiAuth";
import {useNavigate} from "react-router-dom";

export function useLoginHandlers() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);

    const navigate = useNavigate();
    const {login} = useApiAuth();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        login(username, password).then(response => {
            if (response.status === 200) {
                navigate('/menu')
            }
            else {
                setLoginFailed(true);
            }
        }).catch(error => {
            setLoginFailed(error.response.data.message);
        });
    };

    const handleCloseAlert = () => {
        setLoginFailed(false);
    };

    return {
        username, setUsername,
        password, setPassword,
        loginFailed, setLoginFailed,
        handleUsernameChange,
        handlePasswordChange,
        handleLogin,
        handleCloseAlert
    };
}