import './invoiceslist.scss';
import React, {useEffect} from 'react';
// import axios from "axios";
import { connect } from "react-redux";
import { getInvoices } from "../../../../stores/AdminSubscriptions/adminSubscriptions.actions";

const InvoicesList = ({INVOICES, getInvoicesEffect}) =>{

    useEffect(() => {
        getInvoicesEffect()
    }, [getInvoicesEffect])

    return (
        <>
        {INVOICES.invoicesLoading
            ?(
                <p>Cargando...</p>
            ):(
                <div className="admin-invoiceslist-main">
                <h2> Admin Invoices List</h2>
                {INVOICES.invoices && INVOICES.invoices.length > 0
                ?(
                    INVOICES.invoices.map((invoice, index)=>{
                        return (
                            <p key={index}>{invoice.id}</p>
                        )
                    })
                ):(
                    <h2>Not Invoices</h2>
                )}
            </div>
            )
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        INVOICES: state.AdminSubscriptionsReducers,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getInvoicesEffect: () => dispatch(getInvoices())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(InvoicesList);
