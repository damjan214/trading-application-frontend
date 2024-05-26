import {useState} from "react";
import {useApiService} from "../core/ApiService";

export function useTradeSellHandlers(){
    const [amount, setAmount] = useState('');

    const {sellStock, sellAllStocksBySymbol} = useApiService();

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSell = (stock, handleClose, sellAll) => {
        try{
            if(sellAll === true){
                sellAllStocksBySymbol(stock.symbol).then(response => {
                    if (response.status === 200) {
                        handleClose();
                        window.location.reload();
                    }
                });
            }
            else {
                const stockData = {
                    name: stock.name,
                    symbol: stock.symbol,
                    profitOrLoss: stock.pl * 100,
                    timestamp: stock.timestamp,
                }
                sellStock(stockData).then(response => {
                    if (response.status === 200) {
                        handleClose();
                        window.location.reload();
                    }
                })
            }
        }
        catch(error){
            console.error('Error selling stock:', error);
        }
    };

    return {amount, handleAmountChange, handleSell};
}