import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useTradeBuyHandlers} from "./TradeBuyHandlers";

export function TradeBuy({ stock, show, handleClose, fundsLabel }) {
    const {
        amount,
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
                            onChange={handleAmountChange}
                        />
                        <Form.Text className="text-muted">
                            You have {fundsLabel} $ available to invest.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" style={{fontWeight:"bold"}} onClick={handleClose}>
                    CLOSE
                </Button>
                <Button variant="primary" style={{fontWeight:"bold"}} onClick={() =>{handleBuy(stock, handleClose)}}>
                    BUY
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
