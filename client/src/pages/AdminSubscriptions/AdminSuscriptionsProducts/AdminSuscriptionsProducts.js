import './adminSuscriptionsproducts.scss';
import React from 'react';

//components 
import ProductsList from './ProductsList/ProductsList';
const SetupIntents = () =>{

    return (
        <>
            <main className="admin-setupintents-main">
                <h1> Admin Subscription Products</h1>
                <ProductsList/>
            </main>
        </>
    )
}

export default SetupIntents