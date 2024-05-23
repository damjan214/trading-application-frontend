import {useEffect, useState} from "react";
import {useApiService} from "../core/ApiService";
import {useLocation} from "react-router-dom";

export function usePaymentStatusHandlers() {
    const location = useLocation();
    const {confirmPayment} = useApiService();
    const [isSuccess, setIsSuccess] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let isMounted = true;
        setIsSuccess('');

        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');

        const verifyPayment = async () => {
            if (sessionId) {
                try {
                    const response = await confirmPayment(sessionId);
                    if (response.status === 200 && isMounted) {
                        setIsSuccess('success');
                    } else if (isMounted) {
                        setIsSuccess('failed');
                        setErrorMessage(response.response.data.message);
                    }
                } catch (error) {
                    if (isMounted) {
                        console.log(error.response.data.message);
                    }
                }

                setTimeout(() => {
                    if (isMounted) {
                        window.location.href = '/stocks';
                    }
                }, 8000);
            }
        };

        verifyPayment();

        return () => {
            isMounted = false;
        };
    }, [location.search]);

    const handleReturnHome = () => {
        window.location.href = '/stocks';
    };
    return {handleReturnHome, isSuccess, setIsSuccess, errorMessage};
}