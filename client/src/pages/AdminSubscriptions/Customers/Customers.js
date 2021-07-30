import './customers.scss';
import React from 'react';

//components 
import CustomersList from './CustomersList/CustomersList';

const Customers = () =>{

    return (
        <>
            <main className="admin-customers-main">
                <div>
                    <CustomersList/>
                </div>
            </main>
        </>
    )
}

export default Customers