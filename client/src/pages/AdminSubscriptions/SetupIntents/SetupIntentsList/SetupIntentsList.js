import './setupintentslist.scss';
import React, {useEffect} from 'react';
// import axios from "axios";
import { connect } from "react-redux";
import { getSetupIntents } from "../../../../stores/AdminSubscriptions/adminSubscriptions.actions";

const SetupIntentsList = ({SETUP_INTENTS, getSetupIntentsEffect}) =>{

    useEffect(() => {
        getSetupIntentsEffect()
    }, [getSetupIntentsEffect])

    return (
        <>
        {SETUP_INTENTS.setupIntentsLoading
            ?(
                <p>Cargando...</p>
            ):(
                <div className="admin-setupintentslist-main">
                <h2> Admin setup Intents List</h2>
                {SETUP_INTENTS.setupIntents && SETUP_INTENTS.setupIntents.length > 0
                ?(
                    SETUP_INTENTS.setupIntents.map((setupIntent, index)=>{
                        return (
                            <p key={index}>{setupIntent.id}</p>
                        )
                    })
                ):(
                    <h2>Not setup Intents</h2>
                )}
            </div>
            )
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        SETUP_INTENTS: state.AdminSubscriptionsReducers,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getSetupIntentsEffect: () => dispatch(getSetupIntents())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SetupIntentsList);
