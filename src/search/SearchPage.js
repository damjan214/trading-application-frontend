import React from "react";
import MainMenuPage from "../menu/MainMenuPage";
import {useMainMenuHandlers} from "../menu/MainMenuHandlers";
import StockChart from "../stocks/StocksChart";
import StockNews from "../stocks/StockNews";
import {useSearchHandlers} from "./SearchHandlers";

function SearchPage() {
    const {
        funds,
        fundsLabel,
        userFirstName,
        handleFundsChange,
        handleDepositPayment,
        handleWithdrawPayment,
        handleLogout,
    } = useMainMenuHandlers();

    const {
        filteredStocks,
        query,
        selectedStock,
        setSelectedStock,
        handleSearch,
        handleSelectStock
    } = useSearchHandlers();

    return (
        <>
            <MainMenuPage
                userFirstName={userFirstName}
                fundsLabel={fundsLabel}
                funds={funds}
                handleFundsChange={handleFundsChange}
                handleDepositPayment={handleDepositPayment}
                handleWithdrawPayment={handleWithdrawPayment}
                handleLogout={handleLogout}
            />
            {selectedStock && (
                <div className="d-flex justify-content-between">
                    <button className="btn btn-secondary mt-2" onClick={() => setSelectedStock(null)}
                            style={{marginLeft: "110px", fontWeight: "bold"}}>
                        <i className="bi bi-arrow-left" style={{fontWeight: "bold"}}></i> Back
                    </button>
                    <button className="btn btn-primary fw-bold mt-2" style={{marginRight: '110px'}}>TRADE</button>
                </div>
            )}

            <div className="container">
                {!selectedStock && (
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Search for a stock..."
                                value={query}
                                onChange={handleSearch}
                            />
                            <ul className="list-group overflow-auto list-group-scrollable mt-2"
                                style={{maxHeight: "600px"}}>
                                {filteredStocks.map(stock => (
                                    <li key={stock.symbol} className="list-group-item" style={{minHeight: "70px"}}
                                        onClick={() => handleSelectStock(stock)}>
                                        {stock.name} ({stock.symbol})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {selectedStock && (
                    <div className="text-center">
                        <div>
                            <ul className="list-group overflow-auto list-group-scrollable" style={{maxHeight: '600px'}}>
                                <li>
                                    <StockChart stock={selectedStock}/>
                                </li>
                                <li>
                                    <StockNews stock={selectedStock}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchPage;