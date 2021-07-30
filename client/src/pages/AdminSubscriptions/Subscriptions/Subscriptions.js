import './subscriptions.scss';
import React from 'react';

//components 
import SubscriptionsList from './SubscriptionsList/SubscriptionsList';

const Subscriptions = () =>{

    return (
        <>
            <main className="admin-setupintents-main">
                <h1> Admin Subscriptions</h1>
                <SubscriptionsList/>
            </main>
        </>
    )
}

export default Subscriptions