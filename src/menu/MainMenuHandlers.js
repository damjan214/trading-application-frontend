import {useEffect, useState} from "react";
import {useApiService} from "../core/ApiService";
import {useApiAuth} from "../core/ApiAuth";
import {useNavigate} from "react-router-dom";

export function useMainMenuHandlers() {
    const [funds, setFunds] = useState(0);
    const [fundsLabel, setFundsLabel] = useState(0);
    const [userFirstName, setUserFirstName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const navigate = useNavigate();

    const {
        depositPayment,
        withdrawPayment,
        getUserByToken,
        getUserAvatarByToken,
        getUserPortfolioBalance
    } = useApiService();

    const {logout} = useApiAuth();

    useEffect(() => {
        getUserByToken().then(response => {
            if (response.status === 200) {
                setUserFirstName(response.data.firstName);
            }
        }).catch(error => {
            console.log(error.response.data.message);
        });
    }, []);

    useEffect(() => {
        getUserAvatarByToken()
            .then(response => {
                const avatar = `data:image/jpeg;base64,${response.data}`;
                setUserAvatar(avatar);
            })
            .catch(err => {
                console.error('Failed to fetch user avatar:', err);
            });
    }, []);

    useEffect(() => {
        getUserPortfolioBalance().then(response => {
            if (response.status === 200) {
                setFundsLabel(response.data.amount / 100);
            }
        }).catch(error => {
            console.log(error.response.data.message);
        });
    }, []);

    const handleFundsChange = (event) => {
        var value = event.target.value;

        var intValue = parseInt(value, 10);

        if (isNaN(intValue) || intValue < 1) {
            event.target.value = '';
            setFunds(event.target.value);
        } else {
            event.target.value = intValue;
            setFunds(event.target.value);
        }
    };

    const handleDepositPayment = (event) => {
        event.preventDefault();
        const fundsInput = funds * 100;
        depositPayment(fundsInput).then(response => {
                if (response.status === 200) {
                    window.location.href = response.data;
                }
            }
        ).catch(error => {
            console.log(error.response.data.message);
        });

    };

    const handleWithdrawPayment = (event) => {
        event.preventDefault();
        const fundsInput = funds * 100;
        withdrawPayment(fundsInput).then(response => {
                if (response.status === 200) {
                    window.location.href = response.data;
                }
            }
        ).catch(error => {
            console.log(error.response.data.message);
        })
    };
    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        navigate('/login')
    }
    return {
        funds,
        fundsLabel,
        userFirstName,
        userAvatar,
        handleFundsChange,
        handleDepositPayment,
        handleWithdrawPayment,
        handleLogout
    };
}