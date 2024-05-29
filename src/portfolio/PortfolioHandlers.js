import React, {useEffect, useMemo, useState} from "react";
import {useApiService} from "../core/ApiService";

export function usePortfolioHandlers() {
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});

    const [detailedStock, setDetailedStock] = useState();

    const [selectedStockForBuy, setSelectedStockForBuy] = useState(null);
    const [selectedStockForSale, setSelectedStockForSale] = useState(null);
    const [selectedStockForCancel, setSelectedStockForCancel] = useState(null);

    const [fundsInvested, setFundsInvested] = useState(0);
    const [fundsInvestedOrders, setFundsInvestedOrders] = useState(0);
    const [fundsProfitOrLoss, setFundsProfitOrLoss] = useState(0);
    const [fundsPortfolioValue, setFundsPortfolioValue] = useState(0);

    const [loading, setLoading] = useState(true);
    const [sellAll, setSellAll] = useState(false);

    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const [stocks, setStocks] = useState([]);
    const [numberOfStocks, setNumberOfStocks] = useState(null);
    const [detailedStocks, setDetailedStocks] = useState([]);
    const [copyOfDetailedStocks, setCopyOfDetailedStocks] = useState([]);
    const [pendingStocks, setPendingStocks] = useState([]);

    const {
        getStocksFromPortfolio,
        getStocksBySymbol,
        getPendingStocks,
    } = useApiService();

    useEffect(() => {
        const fetchPendingStocks = async () => {
            try {
                const response = await getPendingStocks();
                const pendingStocksData = [];
                let funds = 0;
                for (const stock of response.data) {
                    if (stock.stockStatus === 'BOUGHT') {
                        const stockData = {
                            timestamp: stock.timestamp,
                            name: stock.name,
                            symbol: stock.symbol,
                            price: stock.currentPrice,
                            invested: (stock.balanceInvested / 100).toFixed(2),
                            status: stock.stockStatus
                        };
                        funds += stock.balanceInvested / 100;
                        pendingStocksData.push(stockData);
                    }
                    else {
                        const stockData = {
                            timestamp: stock.timestamp,
                            name: stock.name,
                            symbol: stock.symbol,
                            price: stock.currentPrice,
                            invested: stock.quantity.toFixed(5),
                            status: stock.stockStatus
                        };
                        pendingStocksData.push(stockData);
                    }
                }
                setFundsInvestedOrders(funds);
                setPendingStocks(pendingStocksData);
            } catch (error) {
                console.log(error.response?.data?.message || "An unknown error occurred");
            }
        };

        fetchPendingStocks();
    }, []);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await getStocksFromPortfolio();
                const stocksData = [];
                let invested = 0;
                let totalProfitOrLoss = 0;
                let totalPortfolioValue = 0;
                for (const stock of response.data) {
                    const amount = stock.balanceInvested / 100;
                    const stockData = {
                        symbol: stock.symbol,
                        name: stock.name,
                        price: stock.currentPrice,
                        invested: amount,
                        units: stock.quantity,
                        avgOpen: stock.openPriceDay,
                        pl: stock.profitOrLoss,
                        plPercent: stock.profitOrLossPercentage,
                        value: amount + stock.profitOrLoss
                    };
                    invested += amount;
                    totalProfitOrLoss += stock.profitOrLoss;
                    totalPortfolioValue += amount + stock.profitOrLoss;
                    stocksData.push(stockData);
                }
                setStocks(stocksData);
                setFundsInvested(invested);
                setFundsProfitOrLoss(totalProfitOrLoss);
                setFundsPortfolioValue(totalPortfolioValue);
                setNumberOfStocks(stocksData.length);
                setLoading(false);
            } catch (error) {
                console.log(error.response?.data?.message || "An unknown error occurred");
                setLoading(false);
            }
        };

        const intervalId = setInterval(() => {
            fetchStocks();
        }, 1000); // Interval set at 1000 milliseconds (1 second)

        return () => {
            clearInterval(intervalId); // Clear the interval on component unmount
        };
    }, []);

    useEffect(() => {
        const fetchDetailedStocks = async () => {
            try {
                let detailedStockData = [];
                let copyOfDetailedStockData = [];
                for (const stock of stocks) {
                    const response = await getStocksBySymbol(stock.symbol);
                    for (const stock of response.data) {
                        const amount = stock.balanceInvested / 100;
                        const stockData = {
                            symbol: stock.symbol,
                            name: stock.name,
                            timestamp: stock.timestamp,
                            amount: amount,
                            units: stock.quantity,
                            open: stock.openPriceDay,
                            pl: stock.profitOrLoss,
                            plPercent: stock.profitOrLossPercentage,
                            value: amount + stock.profitOrLoss
                        };
                        detailedStockData.push(stockData);
                        copyOfDetailedStockData.push(stockData);
                    }
                }
                setDetailedStocks(detailedStockData);
                setCopyOfDetailedStocks(copyOfDetailedStockData);
            } catch (error) {
                console.log(error.response?.data?.message || "An unknown error occurred");
            }
        };

        fetchDetailedStocks();
    }, [stocks]);

    useEffect(() => {
        if (copyOfDetailedStocks && detailedStock) {
            let listOfDetailedStocks = copyOfDetailedStocks.filter(stock => stock.symbol === detailedStock.symbol);
            setDetailedStocks(listOfDetailedStocks);
        }
    }, [copyOfDetailedStocks, detailedStock]);

    const handleSelectDetailedStock = (stock) => {
        setDetailedStock(stock)
    }

    const handleOpenBuyModal = (stock) => {
        setSelectedStockForBuy(stock);
        setShowBuyModal(true);
    };

    const handleOpenSellModal = (stock, sellAll) => {
        setSelectedStockForSale(stock);
        setSellAll(sellAll)
        setShowSellModal(true);
    }

    const handleOpenCancelModal = (stock) => {
        setSelectedStockForCancel(stock);
        setShowCancelModal(true);
    }

    const handleCloseBuyModal = () => setShowBuyModal(false);

    const handleCloseSellModal = () => setShowSellModal(false);

    const handleCloseCancelModal = () => setShowCancelModal(false);

    function requestSort(key) {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    }

    const sortedStocks = React.useMemo(() => {
        const sortableItems = [...stocks];
        if (sortConfig && sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue;
                } else {
                    const aStr = String(aValue).toUpperCase();
                    const bStr = String(bValue).toUpperCase();

                    if (aStr < bStr) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (aStr > bStr) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                }
                return 0;
            });
        }
        return sortableItems;
    }, [stocks, sortConfig]);

    const sortedDetailedStocks = React.useMemo(() => {
        if (!sortConfig.key) return detailedStocks;
        return [...detailedStocks].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [detailedStocks, sortConfig]);

    function formatTimestamp(isoString) {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth is zero-indexed
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }

    function isDisabled(stockSymbol, pendingStocks) {
        return pendingStocks.some(stock => stock.symbol === stockSymbol && stock.status === 'SOLD');
    }

    return {
        sortConfig,
        sortedStocks,
        sortedDetailedStocks,
        sellAll,
        showBuyModal,
        showSellModal,
        showCancelModal,
        selectedStockForBuy,
        selectedStockForSale,
        selectedStockForCancel,
        detailedStock,
        setDetailedStock,
        loading,
        fundsInvested,
        fundsInvestedOrders,
        fundsProfitOrLoss,
        fundsPortfolioValue,
        pendingStocks,
        numberOfStocks,
        formatTimestamp,
        isDisabled,
        requestSort,
        handleOpenBuyModal,
        handleOpenSellModal,
        handleCloseBuyModal,
        handleCloseSellModal,
        handleOpenCancelModal,
        handleCloseCancelModal,
        handleSelectDetailedStock
    };
}