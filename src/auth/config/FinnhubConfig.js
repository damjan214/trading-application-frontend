import {useState} from "react";

export function FinnhubConfig() {
    const [finnhubToken, setFinnhubToken] = useState('cns89bpr01qmmmfktmegcns89bpr01qmmmfktmf0');

    return {finnhubToken, setFinnhubToken};
}