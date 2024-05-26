import {useState} from "react";
import {useApiService} from "../core/ApiService";

export function useTradeBuyHandlers(){
    const [amount, setAmount] = useState(0);
    const [tradeError, setTradeError] = useState(false);

    const {buyStock} = useApiService();

    const handleAmountChange = (event, funds) => {
        const value = event.target.value;
        const hasLeadingZeros = value.match(/^0[0-9].*$/);
        if(value <= 0 || isNaN(value) || value > funds || hasLeadingZeros){
            setTradeError(true);
        }
        else {
            setTradeError(false);
        }
        setAmount(event.target.value);
    };

    const handleBuy = (stock, amount, handleClose) => {
        try{
            const stockData = {
                name: stock.name,
                symbol: stock.symbol,
                balanceInvested: amount * 100,
            };
            buyStock(stockData, amount).then(response => {
                if (response.status === 200) {
                    handleClose();
                    window.location.href = '/portfolio';
                    window.location.reload();
                }

            });
        }
        catch(error){
            console.error('Error buying stock:', error);
        }
    };

    return {amount, tradeError, handleAmountChange, handleBuy};
}