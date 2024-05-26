import {useEffect, useState} from "react";
import {useApiService} from "../core/ApiService";

export function useStockHandlers(){
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [symbolsAndNames, setSymbolsAndNames] = useState({});
    const [loading, setLoading] = useState(true);
    const [alphaSortDirection, setAlphaSortDirection] = useState('asc');

    const [sortedStocks, setSortedStocks] = useState([]);

    const {getSymbolsAndNamesMap, getStockDataForToday} = useApiService();

    useEffect(() => {
        const fetchSymbolsAndNames = async () => {
            try {
                const response = await getSymbolsAndNamesMap();
                const symbolsAndNames = response.data;
                setSymbolsAndNames(symbolsAndNames);

                const stockData = [];
                for (const symbol in symbolsAndNames) {
                    const stockDataResponse = await getStockDataForToday(symbol);
                    const stock = {
                        symbol: symbol,
                        name: symbolsAndNames[symbol],
                        price: stockDataResponse.currentPrice,
                        changePercent: stockDataResponse.percentChangeDay
                    };

                    stockData.push(stock);
                }

                setStocks(stockData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchSymbolsAndNames();
    }, []);

    useEffect(() => {
        setSortedStocks(stocks);
    }, [stocks]);

    const sortStocks = (type) => {
        const newSortedStocks = [...stocks];
        switch (type) {
            case 'value_high':
                newSortedStocks.sort((a, b) => b.price - a.price);
                break;
            case 'value_low':
                newSortedStocks.sort((a, b) => a.price - b.price);
                break;
            case 'change_high':
                newSortedStocks.sort((a, b) => b.changePercent - a.changePercent);
                break;
            case 'change_low':
                newSortedStocks.sort((a, b) => a.changePercent - b.changePercent);
                break;
            case 'alpha':
                if (alphaSortDirection === 'asc') {
                    newSortedStocks.sort((a, b) => a.name.localeCompare(b.name));
                    setAlphaSortDirection('desc');
                } else {
                    newSortedStocks.sort((a, b) => b.name.localeCompare(a.name));
                    setAlphaSortDirection('asc');
                }
                break;
        }
        setSortedStocks(newSortedStocks);
    };

    const handleSelectStock = (stock) => {
        setSelectedStock(stock);
    }

    return {stocks, selectedStock, setSelectedStock, loading, sortedStocks, alphaSortDirection, sortStocks, handleSelectStock};
}
