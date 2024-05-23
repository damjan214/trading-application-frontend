import React, {useState} from "react";

export function usePortfolioHandlers(){
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'descending'});
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    const [selectedStockForBuy, setSelectedStockForBuy] = useState(null);
    const [selectedStockForSale, setSelectedStockForSale] = useState(null);

    const [stocks, setStocks] = useState([
        {
            symbol: "TSLA",
            name: "Tesla Motors, Inc.",
            price: 181.44,
            invested: 9998.26,
            units: 57.96429,
            avgOpen: 172.49,
            pl: 535.01,
            plPercent: 5.35,
            value: 10533.27
        },
        {
            symbol: "NVDA",
            name: "NVIDIA Corporation",
            price: 948.77,
            invested: 20999.78,
            units: 23.52529,
            avgOpen: 892.64701,
            pl: 1353.95,
            plPercent: 6.45,
            value: 22353.73
        },
        {
            symbol: "AAPL",
            name: "Apple Inc.",
            price: 280.33,
            invested: 15000,
            units: 53.231,
            avgOpen: 270.55,
            pl: 520.65,
            plPercent: 3.47,
            value: 15520.65
        },
        {
            symbol: "MSFT",
            name: "Seagate Technology Holdings PLC Ordinary Shares (Ireland)\n",
            price: 300.99,
            invested: 12000,
            units: 40.123,
            avgOpen: 295.44,
            pl: 222.89,
            plPercent: 1.85,
            value: 12222.89
        },
        {
            symbol: "GOOGL",
            name: "Alphabet Inc.",
            price: 2350.44,
            invested: 23450,
            units: 10,
            avgOpen: 2200,
            pl: 1504.40,
            plPercent: 6.41,
            value: 24954.40
        }
    ]);

    const handleOpenBuyModal = (stock) => {
        setSelectedStockForBuy(stock);
        setShowBuyModal(true);
    };

    const handleOpenSellModal = (stock) => {
        setSelectedStockForSale(stock);
        setShowSellModal(true);
    }

    const handleCloseBuyModal = () => setShowBuyModal(false);

    const handleCloseSellModal = () => setShowSellModal(false);

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

    return {sortConfig, sortedStocks, showBuyModal, showSellModal, selectedStockForBuy, selectedStockForSale, requestSort, handleOpenBuyModal, handleOpenSellModal, handleCloseBuyModal, handleCloseSellModal};
}