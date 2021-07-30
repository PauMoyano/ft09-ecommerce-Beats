import "./orderwidget.scss";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {fetchAllOrders} from "../../../../stores/admin/admin.actions";
import spinner from "../../../../assets/images/Spin-1s-200px.svg"
const OrderWidget = ({fetchAllOrdersEffect, STORE_ADMIN})=>{

    useEffect(() => {
        fetchAllOrdersEffect()
    }, [fetchAllOrdersEffect])

    return (
        <>
        <div className="--order-widget-title">
            <h1>Orders Live</h1>
        </div>
        {STORE_ADMIN.ordersLoading
        ?(
            <img src={spinner} alt="loading..."></img>
        ):(
        <div className="--order-widget-main">
            <div className="--order-widget-col-cart">
                <div>
                    cart
                </div>
                <div>
                    {STORE_ADMIN.orders && STORE_ADMIN.orders.length > 0
                        ?(
                            STORE_ADMIN.orders.filter(order=>{
                                if(order.orderStatus === "cart"){
                                    return order
                                }
                                return ""
                            }).length

                        ):(
                            <p>Not Orders</p>
                        )
                    }
                </div>
            </div>
            <div className="--order-widget-col-create">
                <div>
                    create
                </div>
                <div>
                    {STORE_ADMIN.orders && STORE_ADMIN.orders.length > 0
                        ?(
                            STORE_ADMIN.orders.filter(order=>{
                                if(order.orderStatus === "create"){
                                    return order
                                }
                                return ""
                            }).length

                        ):(
                            <p>Not Orders</p>
                        )
                    }
                </div>
            </div>
            <div className="--order-widget-col-process">
                <div>
                    process
                </div>
                <div>
                    {STORE_ADMIN.orders && STORE_ADMIN.orders.length > 0
                        ?(
                            STORE_ADMIN.orders.filter(order=>{
                                if(order.orderStatus === "process"){
                                    return order
                                }
                                return ""
                            }).length

                        ):(
                            <p>Not Orders</p>
                        )
                    }
                </div>
            </div>
            <div className="--order-widget-col-cancel">
                <div>
                    cancel
                </div>
                <div>
                    {STORE_ADMIN.orders && STORE_ADMIN.orders.length > 0
                        ?(
                            STORE_ADMIN.orders.filter(order=>{
                                if(order.orderStatus === "cancel"){
                                    return order
                                }
                                return ""
                            }).length

                        ):(
                            <p>Not Orders</p>
                        )
                    }
                </div>
            </div>
            <div className="--order-widget-col-complete">
                <div>
                    complete
                </div>
                <div>
                    {STORE_ADMIN.orders && STORE_ADMIN.orders.length > 0
                        ?(
                            STORE_ADMIN.orders.filter(order=>{
                                if(order.orderStatus === "complete"){
                                    return order
                                }
                                return ""
                            }).length

                        ):(
                            <p>Not Orders</p>
                        )
                    }
                </div>
            </div>
        </div>
        )

        }


        </>
    )
};

const mapStateToProps = (state) => {
    return {
      STORE_ADMIN: state.adminReducers,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllOrdersEffect: () => dispatch(fetchAllOrders()),
    };
  };
  
 export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OrderWidget));
