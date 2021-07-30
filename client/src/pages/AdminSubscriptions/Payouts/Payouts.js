import './payouts.scss';
import React from 'react';

//components 
import PayoutsList from './PayoutsList/PayoutsList';
const Payouts = () =>{

    return (
        <>
            <main className="admin-payouts-main">
                <h1> Admin Payouts</h1>
                <PayoutsList/>
            </main>
        </>
    )
}

export default Payouts