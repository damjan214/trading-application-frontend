import {useMainMenuHandlers} from "../menu/MainMenuHandlers";
import MainMenuPage from "../menu/MainMenuPage";
import React, {useMemo, useState} from "react";
import {TradeBuy} from "../trade/TradeBuy";
import {usePortfolioHandlers} from "./PortfolioHandlers";
import {TradeSell} from "../trade/TradeSell";
import worldOfStocksLogo from "../images/WorldOfStocks.png";
import {CancelPending} from "../trade/CancelPending";

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
        sortConfig,
        sortedStocks,
        sortedDetailedStocks,
        showBuyModal,
        showSellModal,
        showCancelModal,
        sellAll,
        selectedStockForBuy,
        selectedStockForSale,
        selectedStockForCancel,
        detailedStock,
        setDetailedStock,
        loading,
        fundsInvested,
        fundsInvestedOrders,
        fundsProfitOrLoss,
        fundsPortfolioValue,
        pendingStocks,
        numberOfStocks,
        numberOfPendingStocks,
        isDisabled,
        formatTimestamp,
        requestSort,
        handleOpenBuyModal,
        handleOpenSellModal,
        handleOpenCancelModal,
        handleCloseBuyModal,
        handleCloseSellModal,
        handleCloseCancelModal,
        handleSelectDetailedStock,
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
            {loading ? (
                <div className="loading-screen">
                    <img
                        src={worldOfStocksLogo}
                        alt="World of Stocks Logo"
                        className="img-fluid align-content-between"
                        style={{maxHeight: '400px'}}
                    />
                    <div className="spinner"></div>
                </div>
            ) : (
                <div style={{backgroundColor: "#e9f6f8"}}>
                    <div className="container d-flex flex-column" style={{minHeight: '72vh'}}>
                        <div className="d-flex justify-content-between">
                            <h2 className="mb-4">My Portfolio ({numberOfStocks})</h2>
                            {
                                detailedStock && (
                                    <button className="btn btn-secondary mb-2 mt-2" onClick={() => setDetailedStock(null)}
                                            style={{fontWeight: "bold"}}>
                                        <i className="bi bi-arrow-left" style={{fontWeight: "bold"}}></i> Back
                                    </button>
                                )}
                        </div>
                        <div className="table-responsive table-scrollable">
                            <table className="table">
                                {!detailedStock && (
                                    <>
                                        <thead>
                                        <tr>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by Asset"
                                                onClick={() => requestSort('name')}>
                                                Asset {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by Price"
                                                onClick={() => requestSort('price')}>
                                                Price
                                                (USD) {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by Invested"
                                                onClick={() => requestSort('invested')}>
                                                Invested {sortConfig.key === 'invested' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by Units"
                                                onClick={() => requestSort('units')}>
                                                Units {sortConfig.key === 'units' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by Avg. Open"
                                                onClick={() => requestSort('avgOpen')}>
                                                Avg.
                                                Open {sortConfig.key === 'avgOpen' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button" aria-label="Sort by P/L"
                                                onClick={() => requestSort('pl')}>
                                                P/L {sortConfig.key === 'pl' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by P/L (%)"
                                                onClick={() => requestSort('plPercent')}>
                                                P/L
                                                (%) {sortConfig.key === 'plPercent' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by Value"
                                                onClick={() => requestSort('value')}>
                                                Value {sortConfig.key === 'value' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center">Trade</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sortedStocks.map(stock => (
                                            <tr key={stock.symbol}>
                                                <td className="text-center td-button"
                                                    onClick={() => handleSelectDetailedStock(stock)}
                                                    style={{cursor: 'pointer'}}>
                                                    {stock.name} ({stock.symbol})
                                                </td>
                                                <td className="text-center">${stock.price.toFixed(2)}</td>
                                                <td className="text-center">${stock.invested.toFixed(2)}</td>
                                                <td className="text-center">{stock.units.toFixed(5)}</td>
                                                <td className="text-center">${stock.avgOpen.toFixed(2)}</td>
                                                <td className={`text-${stock.pl.toFixed(2) > 0 ? 'success' : stock.pl.toFixed(2) < 0 ? 'danger' : 'muted'} text-center`}>
                                                    ${stock.pl.toFixed(2)}
                                                </td>
                                                <td className={`text-${stock.plPercent.toFixed(2) > 0 ? 'success' : stock.plPercent.toFixed(2) < 0 ? 'danger' : 'muted'} text-center`}>
                                                    {stock.plPercent.toFixed(2)}%
                                                </td>
                                                <td className="text-center">${stock.value.toFixed(2)}</td>
                                                <td className="text-center">
                                                    <button className="btn btn-primary fw-bold"
                                                            onClick={() => handleOpenBuyModal(stock)}>
                                                        TRADE
                                                    </button>
                                                    <button className="btn btn-secondary fw-bold"
                                                            onClick={() => handleOpenSellModal(stock, true)}
                                                            style={{marginLeft: "10px"}}
                                                            disabled={isDisabled(stock.symbol, pendingStocks)}>SELL ALL
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </>
                                )}
                                {detailedStock && (
                                    <>
                                        <thead>
                                        <tr>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by Date/Time"
                                                onClick={() => requestSort('timestamp')}>
                                                Date and
                                                Time {sortConfig.key === 'timestamp' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by Amount"
                                                onClick={() => requestSort('amount')}>
                                                Amount
                                                (USD) {sortConfig.key === 'amount' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by Units"
                                                onClick={() => requestSort('units')}>
                                                Units {sortConfig.key === 'units' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by Open"
                                                onClick={() => requestSort('open')}>
                                                Open {sortConfig.key === 'open' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button" aria-label="Sort by P/L"
                                                onClick={() => requestSort('pl')}>
                                                P/L {sortConfig.key === 'pl' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center th-button" role="button"
                                                aria-label="Sort by P/L (%)"
                                                onClick={() => requestSort('plPercent')}>
                                                P/L
                                                (%) {sortConfig.key === 'plPercent' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                                            </th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sortedDetailedStocks.map(detailedStockFromMap => (
                                            <tr key={detailedStockFromMap.timestamp}>
                                                <td className="text-center">{formatTimestamp(detailedStockFromMap.timestamp)}</td>
                                                <td className="text-center">{detailedStockFromMap.amount}</td>
                                                <td className="text-center">{detailedStockFromMap.units.toFixed(5)}</td>
                                                <td className="text-center">{detailedStockFromMap.open.toFixed(2)}</td>
                                                <td className={`text-center ${detailedStockFromMap.pl.toFixed(2) > 0 ? 'text-success' : detailedStockFromMap.pl.toFixed(2) < 0 ? 'text-danger' : 'text-muted'}`}>
                                                    ${detailedStockFromMap.pl.toFixed(2)}
                                                </td>
                                                <td className={`text-center ${detailedStockFromMap.plPercent.toFixed(2) > 0 ? 'text-success' : detailedStockFromMap.plPercent.toFixed(2) < 0 ? 'text-danger' : 'text-muted'}`}>
                                                    {detailedStockFromMap.plPercent.toFixed(2)}%
                                                </td>
                                                <td className="text-center">
                                                    <button className="btn btn-secondary fw-bold"
                                                            onClick={() => handleOpenSellModal(detailedStockFromMap, false)}>SELL
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </>
                                )}
                            </table>
                        </div>
                        {!detailedStock && pendingStocks.length > 0 ? (
                            <>
                                <h2 className="mb-4">Orders ({numberOfPendingStocks})</h2>
                                <div className="table-responsive table-scrollable mt-2">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="text-center">Date and Time</th>
                                            <th className="text-center">Asset</th>
                                            <th className="text-center">Current</th>
                                            <th className="text-center">Invested</th>
                                            <th className="text-center">Stock status</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {pendingStocks.map(pendingStock => (
                                            <tr key={pendingStock.timestamp}>
                                                <td className="text-center">{formatTimestamp(pendingStock.timestamp)}</td>
                                                <td className="text-center">{pendingStock.name} ({pendingStock.symbol})</td>
                                                <td className="text-center">{pendingStock.price}</td>
                                                <td className="text-center">{pendingStock.invested}</td>
                                                <td className="text-center">{pendingStock.status}</td>
                                                <td className="text-center">
                                                    <button className="btn btn-danger fw-bold" onClick={() => handleOpenCancelModal(pendingStock)}>CANCEL</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>

                                </div>
                            </>
                        ) : null}
                        {
                            selectedStockForBuy && (
                                <TradeBuy
                                    stock={selectedStockForBuy}
                                    show={showBuyModal}
                                    handleClose={handleCloseBuyModal}
                                    fundsLabel={fundsLabel}
                                />
                            )
                        }
                        {
                            selectedStockForSale && (
                                <TradeSell
                                    stock={selectedStockForSale}
                                    show={showSellModal}
                                    handleClose={handleCloseSellModal}
                                    sellAll={sellAll}
                                />
                            )
                        }
                        {
                            selectedStockForCancel && (
                                <CancelPending
                                    stock={selectedStockForCancel}
                                    show={showCancelModal}
                                    handleClose={handleCloseCancelModal}
                                />
                            )
                        }
                        <div className="d-flex justify-content-between mt-auto" style={{backgroundColor: '#2DA4A1'}}>
                            <div style={{marginLeft: "6px"}}>Balance Available: <strong>{fundsLabel.toFixed(2)} $</strong></div>
                            <div>Total Invested: <strong>{fundsInvested.toFixed(2)} $</strong></div>
                            <div>Invested Orders: <strong>{fundsInvestedOrders.toFixed(2)} $</strong></div>
                            <div>Profit/Loss: <strong>{fundsProfitOrLoss.toFixed(2)} $</strong></div>
                            <div style={{marginRight: "6px"}}>
                                Virtual Portfolio
                                Value: <strong>{(parseFloat(fundsPortfolioValue) + parseFloat(fundsLabel)  + parseFloat(fundsInvestedOrders)).toFixed(2)} $</strong>
                            </div>
                        </div>
                    </div>
                </div>
                )}
        </>
    )
        ;
}

export default PortfolioPage;
