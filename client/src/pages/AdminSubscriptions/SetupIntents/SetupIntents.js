import './setupintents.scss';
import React from 'react';

//components 
import SetupIntentsList from './SetupIntentsList/SetupIntentsList';

const SetupIntents = () =>{

    return (
        <>
            <main className="admin-setupintents-main">
                <h1> Admin SetupIntents</h1>
                <SetupIntentsList/>
            </main>
        </>
    )
}

export default SetupIntents