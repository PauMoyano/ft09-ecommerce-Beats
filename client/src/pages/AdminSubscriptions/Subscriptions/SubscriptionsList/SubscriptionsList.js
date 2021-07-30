import './subscriptionslist.scss';
import React, {useEffect} from 'react';
// import axios from "axios";
import { connect } from "react-redux";
import { getSubscriptions } from "../../../../stores/AdminSubscriptions/adminSubscriptions.actions";

const SubscriptionsList = ({SUBSCRIPTIONS, getSubscriptionsEffect}) =>{

    useEffect(() => {
        getSubscriptionsEffect()
    }, [getSubscriptionsEffect])

    return (
        <>
        {SUBSCRIPTIONS.subscriptionsLoading
            ?(
                <p>Cargando...</p>
            ):(
                <div className="admin-subscriptionslist-main">
                <h2> Admin Subscriptions List</h2>
                {SUBSCRIPTIONS.subscriptions && SUBSCRIPTIONS.subscriptions.length > 0
                ?(
                    SUBSCRIPTIONS.subscriptions.map((subscription, index)=>{
                        return (
                            <p key={index}>{subscription.id}</p>
                        )
                    })
                ):(
                    <h2>Not subscriptions</h2>
                )}
            </div>
            )
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        SUBSCRIPTIONS: state.AdminSubscriptionsReducers,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getSubscriptionsEffect: () => dispatch(getSubscriptions())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsList);
