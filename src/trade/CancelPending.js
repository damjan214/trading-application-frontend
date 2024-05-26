import {Button, Modal} from "react-bootstrap";
import {useCancelPendingHandlers} from "./CancelPendingHandlers";

export function CancelPending({ stock, show, handleClose }) {

    const {
        handleCancelOrder
        } = useCancelPendingHandlers();
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Cancel Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to cancel this order?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleCancelOrder(stock, handleClose)}>
                    Cancel Order
                </Button>
            </Modal.Footer>
        </Modal>
    );
}