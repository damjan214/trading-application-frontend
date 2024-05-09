import React from 'react';
import {usePaymentStatusHandlers} from "./PaymentStatusHandlers";
import paymentSuccess from '../images/PaymentSuccessful.png';
import paymentFailed from '../images/PaymentFailed.png';

function PaymentStatusPage (){
    const {isSuccess,errorMessage} = usePaymentStatusHandlers();
    return (
        <div className="container text-center mt-5">
            {isSuccess && (
                <>
                    <img src={isSuccess === 'success' ? paymentSuccess : paymentFailed}
                         alt={isSuccess === 'success' ? 'Success' : 'Failed'}
                         style={{maxWidth: '500px', display: 'block', margin: 'auto'}}/>
                    <div className={`alert ${isSuccess === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                        <h4 className="alert-heading">{isSuccess === 'success' ? 'PAYMENT SUCCESSFUL!' : 'PAYMENT FAILED!'}</h4>
                        <p>{isSuccess === 'success' ? 'Your transaction has been processed successfully.' : 'There was a problem processing your transaction. ' + errorMessage}</p>
                        <hr/>
                        <p className="mb-0">You will be redirected automatically to the homepage.</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentStatusPage;