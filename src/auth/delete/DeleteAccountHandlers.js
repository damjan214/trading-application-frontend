import {useApiAuth} from "../../core/ApiAuth";
import {useApiService} from "../../core/ApiService";
import {useState} from "react";

export function useDeleteAccountHandlers() {
    const {deleteUser} = useApiAuth();
    const {getStocksFromPortfolio} = useApiService();
    const [fundsError, setFundsError] = useState('');
    const [stocksError, setStocksError] = useState('');

    const handleDeleteUser = (fundsLabel) => {
        getStocksFromPortfolio().then(response => {
            if (response.status === 200) {
                let counter = 0;
                let fundsMessage = '';
                let stocksMessage = '';
                for (const stock of response.data) {
                    counter++;
                }
                if (counter !== 0) {
                    fundsMessage = fundsMessage + 'You must sell all your stocks before deleting your account.';
                }
                if (fundsLabel !== 0) {
                    stocksMessage = stocksMessage + ' You must withdraw all your funds before deleting your account.';
                }
                if (fundsMessage === '' && stocksMessage === '') {
                    deleteUser().then(response => {
                        if (response.status === 200) {
                            window.location.href = '/login';
                        }
                    }).catch(error => {
                        console.log(error.response.data.message);
                    });
                }
                setFundsError(fundsMessage);
                setStocksError(stocksMessage);
            }
        }).catch(error => {
            console.log(error.response.data.message);
        });
    };

    return {handleDeleteUser, fundsError, stocksError};
}