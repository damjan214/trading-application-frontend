import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTradeSellHandlers } from "./TradeSellHandlers";

export function TradeSell({ stock, show, handleClose, fundsLabel }) {
    const {
        amount,
        handleSell,
        handleAmountChange
    } = useTradeSellHandlers();

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sell {stock.symbol}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Do you want to sell all? You will get {stock.value} $.</Form.Label>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" style={{fontWeight:"bold"}} onClick={handleClose}>
                    CLOSE
                </Button>
                <Button variant="danger" style={{fontWeight:"bold"}} onClick={handleSell}>
                    SELL
                </Button>
            </Modal.Footer>
        </Modal>
    );
}