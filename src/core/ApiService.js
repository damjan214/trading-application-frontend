import axios from 'axios';
import {useAuthConfig} from "../auth/config/AuthConfig";
import {useLocalStorageService} from "../services/LocalStorageService";

export function useApiService() {
    const {authConfig, paymentConfig} = useAuthConfig();
    const {getToken} = useLocalStorageService();

    const SERVER_URL = 'http://localhost:8080';

    const depositPayment = (amount) => {
        return axios.post( SERVER_URL + '/payment/deposit', {
            amount: amount,
            currency: 'usd'
        }, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getUserAvatarByToken = () => {
        return axios.get(SERVER_URL + '/avatar/get', authConfig(getToken()))
            .then(response => {
                return response;

            })
            .catch(error => {
                return error;
            });
    }

    const getUserByToken = () => {
        return axios.get(SERVER_URL + '/user/get', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getUserPortfolioBalance = () => {
        return axios.get(SERVER_URL + '/portfolio/balance', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const saveUserAvatar = (formData) => {
        return axios.post(SERVER_URL + '/avatar/save', formData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const updateUser = (userData) => {
        return axios.put(SERVER_URL + '/user/update/data', userData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const updatePassword = (passwordData) => {
        return axios.put(SERVER_URL + '/user/update/password', passwordData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const withdrawPayment = (amount) => {
        return axios.post(SERVER_URL + '/payment/withdraw', {
            amount: amount,
            currency: 'usd'
        }, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const confirmPayment = (sessionId) => {
        return axios.get(SERVER_URL + '/payment/confirm', paymentConfig(getToken(), sessionId))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getSymbolsAndNamesMap = () => {
        return axios.get(SERVER_URL + '/symbols/get', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getStockDataForToday = (symbol) => {
        return axios.get(SERVER_URL + `/stockdata/today`, {
            params: {
                symbol: symbol,
            },
            ...authConfig(getToken())
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response;
            });
    }

    const getStocksFromPortfolio = () => {
        return axios.get(SERVER_URL + '/stocks', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getStocksBySymbol = (symbol) => {
        return axios.get(SERVER_URL + `/stocks/symbol`, {
            params: {
                symbol: symbol
            },
            ...authConfig(getToken())
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const buyStock = (stockData) => {
        return axios.post(SERVER_URL + '/stocks/buy', stockData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const sellStock = (stockData) => {
        return axios.post(SERVER_URL + '/stocks/sell', stockData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const sellAllStocksBySymbol = (symbol) => {
        return axios.post(SERVER_URL + '/stocks/sell/all/symbol', {
            symbol: symbol
        }, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getPendingStocks = () => {
        return axios.get(SERVER_URL + '/pending/stocks', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getMarketStatus = () => {
        return axios.get(SERVER_URL + '/stockdata/status', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }
    const changeMarketStatus = () => {
        return axios.get(SERVER_URL + '/stockdata/status/change', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const cancelBuyStockPending = (stockData) => {
        return axios.post(SERVER_URL + '/pending/cancel/buy', stockData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const cancelSellStockPending = (stockData) => {
        return axios.post(SERVER_URL + '/pending/cancel/sell', stockData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    return {
        depositPayment,
        getUserByToken,
        getUserAvatarByToken,
        getUserPortfolioBalance,
        saveUserAvatar,
        updateUser,
        updatePassword,
        withdrawPayment,
        confirmPayment,
        getSymbolsAndNamesMap,
        getStockDataForToday,
        getStocksFromPortfolio,
        getStocksBySymbol,
        buyStock,
        sellStock,
        sellAllStocksBySymbol,
        getPendingStocks,
        getMarketStatus,
        changeMarketStatus,
        cancelBuyStockPending,
        cancelSellStockPending
    };
}
