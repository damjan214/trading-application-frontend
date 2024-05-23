import React, { useState, useEffect } from 'react';
import MainMenuPage from "../menu/MainMenuPage";
import { useMainMenuHandlers } from "../menu/MainMenuHandlers";
import StockChart from "./StocksChart";
import { useStockHandlers } from "./StocksHandlers";
import worldOfStocksLogo from "../images/WorldOfStocks.png";
import StockNews from "./StockNews";
import {TradeBuy} from "../trade/TradeBuy";
import {usePortfolioHandlers} from "../portfolio/PortfolioHandlers";

function StocksPage() {
    const {
        funds,
        fundsLabel,
        userFirstName,
        handleFundsChange,
        handleDepositPayment,
        handleWithdrawPayment,
        handleLogout,
    } = useMainMenuHandlers();

    const { selectedStock, loading, sortedStocks, alphaSortDirection, sortStocks, handleSelectStock} = useStockHandlers();

    const {
        showModal,
        handleOpenModal,
        handleCloseModal
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
                <div className="container-fluid ps-0" style={{backgroundColor: '#345B6F'}}>
                    <div className="row">
                        <div className="col-md-4 border-end">
                            <div className="mb-2">
                                <button onClick={() => sortStocks('value_high')} className="btn btn-secondary"
                                        style={{fontSize: '14px', marginRight: '1px'}}>
                                    <i className="bi bi-arrow-up-circle-fill"></i> High Value
                                </button>
                                <button onClick={() => sortStocks('value_low')} className="btn btn-secondary"
                                        style={{fontSize: '14px', marginRight: '1px'}}>
                                    <i className="bi bi-arrow-down-circle-fill"></i> Low Value
                                </button>
                                <button onClick={() => sortStocks('change_high')} className="btn btn-secondary"
                                        style={{fontSize: '14px', marginRight: '1px'}}>
                                    <i className="bi bi-sort-numeric-up"></i> Biggest Change
                                </button>
                                <button onClick={() => sortStocks('change_low')} className="btn btn-secondary"
                                        style={{fontSize: '14px', marginRight: '1px'}}>
                                    <i className="bi bi-sort-numeric-down"></i> Lowest Change
                                </button>
                                <button onClick={() => sortStocks('alpha')} className="btn btn-secondary"
                                        style={{fontSize: '14px'}}>
                                    <i className={`bi ${alphaSortDirection === 'asc' ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
                                    Alphabetical
                                </button>
                            </div>
                            <ul className="list-group overflow-auto list-group-scrollable">
                                {sortedStocks.map(stock => (
                                    <li key={stock.symbol}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        style={{fontSize: '12px'}}
                                        onClick={() => handleSelectStock(stock)}>
                                        <div>
                                            <span className='stock-name' style={{
                                                fontWeight: 'bold',
                                                fontSize: '14px'
                                            }}>{stock.name}</span><br/>({stock.symbol})
                                        </div>
                                        <div>
                                            <span className="badge rounded-pill"
                                                  style={{fontWeight: 'bold', fontSize: '14px'}}>
                                                $ {stock.price.toFixed(2)}
                                            </span><br/>
                                            <span style={{
                                                color: stock.changePercent >= 0 ? 'lime' : 'red',
                                                fontSize: '11px',
                                                marginLeft: '30px',
                                                fontWeight: 'bold',
                                            }}>
                                                {stock.changePercent}%
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-8" style={{backgroundColor: '#e9f6f8'}}>
                            {selectedStock && (
                                <div>
                                    <ul className="list-group overflow-auto list-group-scrollable">
                                        <li>
                                            <StockChart stock={selectedStock}/>
                                        </li>
                                        <li>
                                            <div className="d-flex mb-2 mt-2 justify-content-end">
                                                <button className="btn btn-primary fw-bold" key={selectedStock.symbol}
                                                        onClick={() => handleOpenModal(selectedStock)}>
                                                    TRADE
                                                </button>
                                            </div>
                                        </li>
                                        <li>
                                            <StockNews stock={selectedStock}/>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {selectedStock && (
                <TradeBuy
                    stock={selectedStock}
                    show={showModal}
                    handleClose={handleCloseModal}
                    fundsLabel={fundsLabel}
                />
            )}
        </>
    );
}

export default StocksPage;