import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useTradeBuyHandlers} from "./TradeBuyHandlers";

export function TradeBuy({ stock, show, handleClose, fundsLabel }) {
    const {
        amount,
        tradeError,
        handleAmountChange,
        handleBuy
    } = useTradeBuyHandlers();

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Invest in {stock.symbol}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Amount to invest</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount in USD"
                            value={amount}
                            onChange={(event) => handleAmountChange(event, fundsLabel)}
                            style={{
                                borderColor: tradeError ? 'red' : undefined,
                            }}
                        />
                        <Form.Text className="text-muted">
                            You have ${fundsLabel.toFixed(2)} available to invest.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" style={{fontWeight: "bold"}} onClick={handleClose}>
                    CLOSE
                </Button>
                <Button variant="primary" style={{fontWeight: "bold"}} onClick={() => handleBuy(stock, amount, handleClose)} disabled={tradeError || amount === 0}>
                    BUY
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
