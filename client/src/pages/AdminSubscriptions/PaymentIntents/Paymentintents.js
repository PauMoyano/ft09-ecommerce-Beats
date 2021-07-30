import './paymentintents.scss';
import React from 'react';

//components 
import PaymentIntentsList from './PaymentIntentsList/PaymentIntentsList';

const PaymentIntents = () =>{

    return (
        <>
            <main className="admin-paymentintents-main">
                <h1> Admin PaymentIntents</h1>
                <PaymentIntentsList/>
            </main>
        </>
    )
}

export default PaymentIntents