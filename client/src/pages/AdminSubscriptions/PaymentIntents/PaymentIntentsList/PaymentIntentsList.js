import './paymentIntentslist.scss';
import React, {useEffect} from 'react';
// import axios from "axios";
import { connect } from "react-redux";
import { getPaymentIntent } from "../../../../stores/AdminSubscriptions/adminSubscriptions.actions";

const PaymentIntentsList = ({PAYMENTINTENTS, getPaymentIntentEffect}) =>{

    useEffect(() => {
        getPaymentIntentEffect()
    }, [getPaymentIntentEffect])

    return (
        <>
        {PAYMENTINTENTS.paymentintentsLoading
            ?(
                <p>Cargando...</p>
            ):(
                <div className="admin-customerslist-main">
                <h2> Admin PaymentIntents List</h2>
                {PAYMENTINTENTS.paymentintents && PAYMENTINTENTS.paymentintents.length > 0
                ?(
                    PAYMENTINTENTS.paymentintents.map((paymentintent, index)=>{
                        return (
                            <p key={index}>{paymentintent.id}</p>
                        )
                    })
                ):(
                    <h2>Not Customers</h2>
                )}
            </div>
            )
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        PAYMENTINTENTS: state.AdminSubscriptionsReducers,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getPaymentIntentEffect: () => dispatch(getPaymentIntent())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentIntentsList);
