import './payoutslist.scss';
import React, {useEffect} from 'react';
// import axios from "axios";
import { connect } from "react-redux";
import { getPayouts } from "../../../../stores/AdminSubscriptions/adminSubscriptions.actions";

const PayoutsList = ({PAYOUTS, getPayoutsEffect}) =>{

    useEffect(() => {
        getPayoutsEffect()
    }, [getPayoutsEffect])

    return (
        <>
        {PAYOUTS.payoutsLoading
            ?(
                <p>Cargando...</p>
            ):(
                <div className="admin-payoutslist-main">
                <h2> Admin Payouts List</h2>
                {PAYOUTS.payouts && PAYOUTS.payouts.length > 0
                ?(
                    PAYOUTS.payouts.map((payout, index)=>{
                        return (
                            <p key={index}>{payout.id}</p>
                        )
                    })
                ):(
                    <h2>Not Payouts</h2>
                )}
            </div>
            )
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        PAYOUTS: state.AdminSubscriptionsReducers,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getPayoutsEffect: () => dispatch(getPayouts())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PayoutsList);
