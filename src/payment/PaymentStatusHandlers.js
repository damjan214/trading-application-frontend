import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useApiService} from "../core/ApiService";

export function usePaymentStatusHandlers() {
    const navigate = useNavigate();
    const location = useLocation();
    const {confirmPayment} = useApiService();
    const [isSuccess, setIsSuccess] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setIsSuccess('')
        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');
        if(sessionId){
            confirmPayment(sessionId).then(response => {
                if(response.status === 200){
                    setIsSuccess('success');
                }
                else{
                    setIsSuccess('failed');
                    setErrorMessage(response.response.data.message)
                }
            }).catch(error => {
                console.log(error.response.data.message);
            });
            setTimeout(() => {
                navigate('/menu');
            }
            , 8000);
        }
    }, []);

    const handleReturnHome = () => {
        navigate('/menu');
    };
    return {handleReturnHome, isSuccess, setIsSuccess, errorMessage};
}