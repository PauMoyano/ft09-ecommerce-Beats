import './customerslist.scss';
import React, {useEffect} from 'react';
import { connect } from "react-redux";
import moment from "moment";
import Spinner from "../../../../assets/images/Spin-1s-200px.svg"
import { getCustomers } from "../../../../stores/AdminSubscriptions/adminSubscriptions.actions";
//import CustomersLoader from '../../Loaders/CustomersLoader';
//<CustomersLoader/>
const CustomersList = ({CUSTOMERS, getCustomersEffect}) =>{

    useEffect(() => {
        getCustomersEffect()
    }, [getCustomersEffect])

    return (
        <>
        {CUSTOMERS.customersLoading
            ?(
                <div className="customerlist-loadding">
                    <img src={Spinner} alt="loadding..."></img>
                </div>
            ):(
                <div className="admin-customerslist-main">
                <h2> Admin Customers List</h2>
                {CUSTOMERS.customers && CUSTOMERS.customers.length > 0
                ?(
                    CUSTOMERS.customers.map((customer, index)=>{
                        return (
                            <div className="admin-customerslist-main-customer" key={index}>
                                <div className="admin-customerslist-main-col-one">
                                    <div className="admin-customerslist-main-col-one-id">
                                        <h3>ID:</h3>
                                        <h4>{customer.id}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Object:</h3>
                                        <h4>{customer.object}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Created:</h3>
                                        <h4>{moment(customer.created).format('MMMM Do YYYY, h:mm:ss a')}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Delinquent:</h3>
                                        <h4>{customer.delinquent ? "TRUE" : "FALSE"}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-bal">
                                        <h3>Balance:</h3>
                                        <h4>{customer.balance}</h4>
                                     </div>
                                </div>
                                <div className="admin-customerslist-main-col-one">
                                    <div className="admin-customerslist-main-col-one-id">
                                        <h3>Adrres:</h3>
                                        <h4>{customer.address}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Currency:</h3>
                                        <h4>{customer.currency}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Source:</h3>
                                        <h4>{customer.default_source}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Metadata Phone:</h3>
                                        <h4>{customer.metadata.phone}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-bal">
                                        <h3>Metadata Email:</h3>
                                        <h4>{customer.metadata.email}</h4>
                                     </div>
                                </div>
                                <div className="admin-customerslist-main-col-one">
                                    <div className="admin-customerslist-main-col-one-id">
                                        <h3>Description:</h3>
                                        <h4>{customer.description}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Discount:</h3>
                                        <h4>{customer.discount}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Email:</h3>
                                        <h4>{customer.email}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Invoice Prefix:</h3>
                                        <h4>{customer.invoice_prefix}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Livemode:</h3>
                                        <h4>{customer.livemode}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-id">
                                        <h3>Metadata Subscription Mode:</h3>
                                        <h4>{customer.metadata.subscription_mode}</h4>
                                     </div>
                                     <div className="admin-customerslist-main-col-one-bal">
                                        <h3>Metadata Description:</h3>
                                        <h4>{customer.metadata.description}</h4>
                                     </div>
                                </div>     
                               
                            </div>
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
      CUSTOMERS: state.AdminSubscriptionsReducers,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getCustomersEffect: () => dispatch(getCustomers())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CustomersList);
