import axios from 'axios';
import {useAuthConfig} from "../auth/config/AuthConfig";
import {useLocalStorageService} from "../services/LocalStorageService";

export function useApiService() {
    const {authConfig, paymentConfig} = useAuthConfig();
    const {getToken} = useLocalStorageService();

    const depositPayment = (amount) => {
        return axios.post('http://localhost:8080/payment/deposit', {
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
        return axios.get('http://localhost:8080/avatar/get', authConfig(getToken()))
            .then(response => {
                return response;

            })
            .catch(error => {
                return error;
            });
    }

    const getUserByToken = () => {
        return axios.get('http://localhost:8080/user/get', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getUserPortfolioBalance = () => {
        return axios.get('http://localhost:8080/portfolio/balance', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const saveUserAvatar = (formData) => {
        return axios.post('http://localhost:8080/avatar/save', formData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const updateUser = (userData) => {
        return axios.put('http://localhost:8080/user/update/data', userData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const updatePassword = (passwordData) => {
        return axios.put('http://localhost:8080/user/update/password', passwordData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const withdrawPayment = (amount) => {
        return axios.post('http://localhost:8080/payment/withdraw', {
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
        return axios.get('http://localhost:8080/payment/confirm', paymentConfig(getToken(), sessionId))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getSymbolsAndNamesMap = () => {
        return axios.get('http://localhost:8080/symbols/get', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getStockDataForToday = (symbol, timestamp) => {
        return axios.get(`http://localhost:8080/stockdata/today`, {
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
        return axios.get('http://localhost:8080/stocks', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getStocksBySymbol = (symbol) => {
        return axios.get(`http://localhost:8080/stocks/symbol`, {
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
        return axios.post('http://localhost:8080/stocks/buy', stockData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const sellStock = (stockData) => {
        return axios.post('http://localhost:8080/stocks/sell', stockData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const sellAllStocksBySymbol = (symbol) => {
        return axios.post('http://localhost:8080/stocks/sell/all/symbol', {
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
        return axios.get('http://localhost:8080/pending/stocks', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const getMarketStatus = () => {
        return axios.get('http://localhost:8080/stockdata/status', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }
    const changeMarketStatus = () => {
        return axios.get('http://localhost:8080/stockdata/status/change', authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const cancelBuyStockPending = (stockData) => {
        return axios.post('http://localhost:8080/pending/cancel/buy', stockData, authConfig(getToken()))
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    const cancelSellStockPending = (stockData) => {
        return axios.post('http://localhost:8080/pending/cancel/sell', stockData, authConfig(getToken()))
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
