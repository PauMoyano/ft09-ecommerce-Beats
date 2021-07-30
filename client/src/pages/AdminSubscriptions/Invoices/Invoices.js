import './invoices.scss';
import React from 'react';

//components 
import InvoicesList from './InvoicesList/InvoicesList';

const Invoices = () =>{

    return (
        <>
            <main className="admin-invoices-main">
                <h1> Admin Invoices</h1>
                <InvoicesList/>
            </main>
        </>
    )
}

export default Invoices