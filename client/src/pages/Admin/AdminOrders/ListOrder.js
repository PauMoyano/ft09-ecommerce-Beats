import "./listOrder.css";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AdminNav from "../AdminNav/AdminNav";
import FilterOrder from "./FilterOrder"
import { fetchAllOrders, deleteOrderById } from "../../../stores/admin/admin.actions";
const ListOrder = ({ fetchAllOrdersEffect, filtered_orders, deleteOrderByIdEffect, STORE_USER }) => {
    //USER IDENTIFICATION FOR REDUCER #############################################
    let userStore =
        STORE_USER.user && STORE_USER.user.data && STORE_USER.user.data.user
            ? STORE_USER.user.data.user
            : null;
    let user = {
        userStatus: userStore ? true : false,
        id: userStore && userStore.id ? userStore.id : 0,
        orderId: STORE_USER.cartDetaills.id ? STORE_USER.cartDetaills.id : 0,
        rol: userStore && userStore.rol ? userStore.rol : 0,
    };
    //#############################################################################
    let history = useHistory();
    useEffect(() => {
        fetchAllOrdersEffect()
    }, [fetchAllOrdersEffect]);

    const handleClickEdit = (order) => {
        history.push(`/admin/listorders/${order}`);
    };
    const handleClickDelete = (id) => {
        try {
            id ? deleteOrderByIdEffect(id) : console.log("no hay id")
            setTimeout(function () { fetchAllOrdersEffect() }, 1000);



            console.log(id)

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            {user && user.rol === "admin" ? (
                <>
                    <AdminNav></AdminNav>
                    <div className="list-users-main">
                        <div className="--Cart">
                            <div className="--Cart-items">
                            <h1 className="title-super">filter by status:</h1> <FilterOrder />
                                {filtered_orders && filtered_orders.length > 0 ? (
                                    <>
                                        <div>
                                            {filtered_orders.map((order, index) => {
                                                return (
                                                    <div key={index} className="--ItemCard">
                                                        <div className="--ItemCard-left">
                                                            <div className="--ItemCard-data">
                                                                <h1>user: {order.userName ? order.userName : "Guest"}</h1>
                                                                {order.userName && order.userEmail ? (
                                                                    <div>
                                                                        <h2>email: {order.userEmail}</h2>
                                                                    </div>
                                                                ) : (

                                                                    <div></div>
                                                                )
                                                                }
                                                                <h2>order status: {order.orderStatus}</h2>
                                                                <h2>total: ${order.total}</h2>

                                                            </div>
                                                        </div>
                                                        <div className="--ItemCard-right">
                                                            <span onClick={() => handleClickEdit(order.id)}>
                                                                <i class="far fa-edit --ItemCard-editItem"></i>
                                                            </span>
                                                            <span onClick={() => handleClickDelete(order.id)}>
                                                                <i class="fas fa-trash-alt --ItemCard-deletItem"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div></div>
                                    </>
                                ) : (
                                    <h1 className="empy-cart">There are no results</h1>
                                )}
                            </div>
                        </div>
                    </div>
                </>) : (
                <div className="--admin--main-panel" >
                    <h1>Acceso Denegado Only Admin Can Be See This Page</h1>
                </div>
            )
            }
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        filtered_orders: state.adminReducers.ordersFiltered,
        STORE_USER: state.userReducers
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllOrdersEffect: () => dispatch(fetchAllOrders()),
        deleteOrderByIdEffect: (id) => dispatch(deleteOrderById(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);
