import {useState} from "react";

export function useTradeBuyHandlers(){
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleBuy = (stock, handleClose) => {
        console.log(`Buying ${amount} worth of ${stock.name}`);
        handleClose();
    };

    return {amount, handleAmountChange, handleBuy};
}