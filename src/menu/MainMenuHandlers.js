import {useEffect, useState} from "react";
import {useApiService} from "../core/ApiService";
import {useApiAuth} from "../core/ApiAuth";
import {useMainMenuValidators} from "./MainMenuValidators";

export function useMainMenuHandlers() {
    const [funds, setFunds] = useState(0);
    const [fundsLabel, setFundsLabel] = useState(0);
    const [userAvatar, setUserAvatar] = useState('');
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [withdrawError, setWithdrawError] = useState(false);

    const {
        depositPayment,
        withdrawPayment,
        getUserAvatarByToken,
        getUserPortfolioBalance
    } = useApiService();

    const {validateWithdraw} = useMainMenuValidators();

    const {logout} = useApiAuth();

    useEffect(() => {
        const fetchUserAvatar = async () => {
            try {
                const response = await getUserAvatarByToken();
                const avatar = `data:image/jpeg;base64,${response.data}`;
                setUserAvatar(avatar);
            } catch (err) {
                console.error('Failed to fetch user avatar:', err);
            }
        };

        fetchUserAvatar();

    }, []);
    useEffect(() => {
        const fetchUserPortfolioBalance = async () => {
            try {
                const response = await getUserPortfolioBalance();
                if (response.status === 200) {
                    setFundsLabel(response.data.amount / 100);  // Assuming amount is in cents
                }
            } catch (error) {
                console.log(error.response?.data?.message || "An unknown error occurred");
            }
        };

        fetchUserPortfolioBalance();
    }, []);
    const handleFundsChange = (event, paymentType, fundsValue) => {
        var value = event.target.value;
        if (paymentType === 'withdraw') {
            validateWithdraw(value, fundsValue, setWithdrawError);
        }
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
        window.location.href = '/login';
    }
    return {
        funds,
        setFunds,
        fundsLabel,
        userAvatar,
        showDeposit,
        showWithdraw,
        setShowDeposit,
        setShowWithdraw,
        withdrawError,
        setWithdrawError,
        handleFundsChange,
        handleDepositPayment,
        handleWithdrawPayment,
        handleLogout
    };
}