import {useState} from "react";

export function useTradeSellHandlers(){
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSell = (stock, handleClose) => {
        console.log(`Selling ${amount} worth of ${stock.name}`);
        handleClose();
    };

    return {amount, handleAmountChange, handleSell};
}