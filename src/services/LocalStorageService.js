import {jwtDecode} from "jwt-decode";

export function useLocalStorageService() {

    const getToken = () => {
        return localStorage.getItem('token');
    }

    const setItem = (key, value) => {
        localStorage.setItem(key, value);
    }

    const removeToken = () => {
        localStorage.removeItem('token');
    };

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return true;
        }
    };

    const hasValidToken = () => {
        const token = getToken();
        if (!token) {
            return false;
        }
        if (isTokenExpired(token)) {
            removeToken();
            return false;
        }
        return true;
    };
    return {
        getToken,
        setItem,
        removeToken,
        isTokenExpired,
        hasValidToken
    };
}