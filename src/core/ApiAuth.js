import axios from 'axios';
import {useLocalStorageService} from "../services/LocalStorageService";
import {useAuthConfig} from "../auth/config/AuthConfig";

export function useApiAuth() {
    const {
        setItem,
        removeToken,
        getToken
    } = useLocalStorageService();

    const {authConfig} = useAuthConfig();

    const login = (username, password) => {
        return axios.post('http://localhost:8080/auth/login', {
            username: username,
            password: password
        })
            .then(response => {
                const token = response.data.token;
                setItem('token', token);
                return response;
            })
            .catch(error => {
                return error;
            });
    };

    const register = (formData) => {
        return axios.post('http://localhost:8080/auth/register', {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            countryOfResidence: formData.countryOfResidence
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const logout = () => {
        removeToken();
    };

    const deleteUser = () => {
        return axios.delete('http://localhost:8080/auth/delete', authConfig(getToken()))
            .then(response => {
                removeToken();
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    return {
        login,
        register,
        logout,
        deleteUser
    };
}
