import {useEffect, useState} from "react";
import {useApiService} from "../core/ApiService";

export function useSearchHandlers(){
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [query, setQuery] = useState("");

    const {getSymbolsAndNamesMap} = useApiService();

    useEffect(() => {
        const fetchSymbolsAndNames = async () => {
            try {
                const response = await getSymbolsAndNamesMap();
                const symbolsAndNames = response.data;
                let stockData = [];

                for (const symbol in symbolsAndNames) {
                    stockData.push({
                        symbol: symbol,
                        name: symbolsAndNames[symbol]
                    });
                }

                stockData.sort((a, b) => a.name.localeCompare(b.name));

                setStocks(stockData);
            } catch (error) {
                console.error('Failed to fetch stock data:', error);
            }
        };

        fetchSymbolsAndNames();
    }, []);


    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    const filteredStocks = stocks.filter(
        stock => stock.name.toLowerCase().includes(query.toLowerCase()) || stock.symbol.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelectStock = (stock) => {
        setSelectedStock(stock);
    };
    return {query, filteredStocks, selectedStock, setSelectedStock, handleSearch, handleSelectStock};
}