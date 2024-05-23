import {useMainMenuHandlers} from "../menu/MainMenuHandlers";
import MainMenuPage from "../menu/MainMenuPage";
import React, {useState} from "react";
import {TradeBuy} from "../trade/TradeBuy";
import {usePortfolioHandlers} from "./PortfolioHandlers";
import {TradeSell} from "../trade/TradeSell";

function PortfolioPage() {

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
        sortConfig, sortedStocks, showBuyModal, showSellModal, selectedStockForBuy, selectedStockForSale, requestSort, handleOpenBuyModal, handleOpenSellModal, handleCloseBuyModal, handleCloseSellModal
    } = usePortfolioHandlers();

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
            <div style={{backgroundColor:"#e9f6f8"}}>
                <div className="container d-flex flex-column" style={{minHeight: '72vh'}}>
                    <h2 className="mb-4">My Portfolio</h2>
                    <div className="table-responsive table-scrollable">
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="text-center th-button" role="button" aria-label="Sort by Asset"
                                    onClick={() => requestSort('name')}>
                                    Asset {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                </th>
                                <th className="text-center th-button" role="button" aria-label="Sort by Price"
                                    onClick={() => requestSort('price')}>
                                    Price {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                </th>
                                <th className="text-center th-button" role="button" aria-label="Sort by Invested"
                                    onClick={() => requestSort('invested')}>
                                    Invested {sortConfig.key === 'invested' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                </th>
                                <th className="text-center th-button" role="button" aria-label="Sort by Units"
                                    onClick={() => requestSort('units')}>
                                    Units {sortConfig.key === 'units' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                </th>
                                <th className="text-center th-button" role="button" aria-label="Sort by Avg. Open"
                                    onClick={() => requestSort('avgOpen')}>
                                    Avg.
                                    Open {sortConfig.key === 'avgOpen' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                </th>
                                <th className="text-center th-button" role="button" aria-label="Sort by P/L"
                                    onClick={() => requestSort('pl')}>
                                    P/L {sortConfig.key === 'pl' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                </th>
                                <th className="text-center th-button" role="button" aria-label="Sort by P/L (%)"
                                    onClick={() => requestSort('plPercent')}>
                                    P/L
                                    (%) {sortConfig.key === 'plPercent' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                </th>
                                <th className="text-center th-button" role="button" aria-label="Sort by Value"
                                    onClick={() => requestSort('value')}>
                                    Value {sortConfig.key === 'value' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                </th>
                                <th className="text-center">Trade</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedStocks.map(stock => (
                                <tr key={stock.symbol}>
                                    <td className="text-center td-button">{stock.name} ({stock.symbol})</td>
                                    <td className="text-center">${stock.price.toFixed(2)}</td>
                                    <td className="text-center">${stock.invested.toFixed(2)}</td>
                                    <td className="text-center">{stock.units.toFixed(5)}</td>
                                    <td className="text-center">${stock.avgOpen.toFixed(2)}</td>
                                    <td className={`text-${stock.pl >= 0 ? 'success' : 'danger'} text-center`}>${stock.pl.toFixed(2)}</td>
                                    <td className={`text-${stock.plPercent >= 0 ? 'success' : 'danger'} text-center`}>{stock.plPercent.toFixed(2)}%</td>
                                    <td className="text-center">${stock.value.toFixed(2)}</td>
                                    <td className="text-center">
                                        <button className="btn btn-primary fw-bold" onClick={() => handleOpenBuyModal(stock)}>
                                            TRADE
                                        </button>
                                        <button className="btn btn-secondary fw-bold" onClick={() => handleOpenSellModal(stock)} style={{marginLeft: "10px"}}>SELL
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {selectedStockForBuy && (
                                <TradeBuy
                                    stock={selectedStockForBuy}
                                    show={showBuyModal}
                                    handleClose={handleCloseBuyModal}
                                    fundsLabel={fundsLabel}
                                />
                            )}
                            {selectedStockForSale && (
                                <TradeSell
                                    stock={selectedStockForSale}
                                    show={showSellModal}
                                    handleClose={handleCloseSellModal}
                                />
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-between mt-auto" style={{backgroundColor: '#2DA4A1'}}>
                        <div style={{marginLeft: "6px"}}>Balance Available: <strong>{fundsLabel} $</strong></div>
                        <div>Total Invested: <strong>$30,998.04</strong></div>
                        <div>Profit/Loss: <strong>$1,888.96</strong></div>
                        <div style={{marginRight: "6px"}}>
                            Virtual Portfolio Value: <strong>$101,969.26</strong>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PortfolioPage;
