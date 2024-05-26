import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {useDeleteAccountHandlers} from "./DeleteAccountHandlers";

export function DeleteAccount({handleShow, handleClose, fundsLabel}) {

    const {handleDeleteUser, fundsError, stocksError} = useDeleteAccountHandlers();

    return (
        <>
            <Modal show={handleShow} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to permanently close your account?
                    <br></br>
                    This action cannot be undone.
                    {fundsError && <label style={{color: 'red'}}>{fundsError}</label>}
                    {stocksError && <label style={{color: 'red'}}>{stocksError}</label>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser(fundsLabel)}>
                        Close my account
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteAccount;