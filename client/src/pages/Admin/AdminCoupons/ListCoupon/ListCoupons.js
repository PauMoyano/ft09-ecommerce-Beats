import React, { useEffect, useState } from "react";

import "../../AdminCategories/listCat.css"
// import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AdminNav from "../../AdminNav/AdminNav";
import swal from 'sweetalert';
import axios from "axios";
import { serverUrl } from '../../../../auxiliar/variables';

const ListCoupons = ({ STORE_USER }) => {
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
    // const history = useHistory();

    const [coupons, setCoupons] = useState([])

    useEffect(() => {
        axios.get(`${serverUrl}/coupons`)
            .then((coupons) => {
                setCoupons(coupons.data)
            })
    }, []);

    // const handleClickEdit = (categoryId, name, description) => {
    //     history.push(`/editCat/${categoryId}/${name}/${description}`);
    // };
    const handleClickDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this coupon!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal(" the coupon has been deleted!", {
                        icon: "success",
                    });
                    axios.delete(`${serverUrl}/coupons/${id}`)
                        .then(() => {
                            swal(" the coupon has been deleted!", {
                                icon: "success",
                            });
                            axios.get(`${serverUrl}/coupons`)
                                .then((coupons) => {
                                    setCoupons(coupons.data)
                                })
                        })
                        .catch(()=>{
                            swal("An error has occurred", {
                                icon: "error",
                            });
                        })
                } else {
                    swal("the coupon is safe!");
                }
            });
    }

    return (
        <>{user && user.rol === "admin"
            ? (
                <>
                    <AdminNav></AdminNav>
                    <div className="list-users-main">
                        <div className="--Cart-categorie">
                            <div className="--Cart-title">
                                <h1>Coupon list</h1>
                            </div>
                            <div className="--Cart-items">
                                {coupons && coupons.length > 0 ? (
                                    <>
                                        <div>
                                            {coupons.map((coupon, index) => {
                                                return (
                                                    <div key={index} className="--ItemCard">
                                                        <div className="--ItemCard-left">
                                                            <div className="--ItemCard-data">
                                                                <h2>Code: {coupon.coupon}</h2>
                                                                <p>Discount: {coupon.discount}</p>
                                                            </div>
                                                        </div>
                                                        <div className="--ItemCard-right">
                                                            {/* <span onClick={() => handleClickEdit(category.id, category.name, category.description)}>
                                                                <i className="far fa-edit --ItemCard-editItem"></i>
                                                            </span> */}
                                                            <span onClick={() => handleClickDelete(coupon.id)}>
                                                                <i className="fas fa-trash-alt --ItemCard-deletItem"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div></div>
                                    </>
                                ) : (
                                    <p className="empy-cart">No se encontraron Cupones</p>
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
    )
}

const mapStateToProps = (state) => {
    return {
        STORE_USER: state.userReducers
    };
};
export default connect(mapStateToProps)(ListCoupons);