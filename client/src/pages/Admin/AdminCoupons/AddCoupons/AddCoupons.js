import React, {useState} from "react";

import "../../AdminCategories/addcategorynew.scss";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';
import { serverUrl } from '../../../../auxiliar/variables';
import AdminNav from '../../../../pages/Admin/AdminNav/AdminNav';
import swal from 'sweetalert';
import axios from "axios";
import spinner from "../../../../assets/images/Spin-1s-200px.svg";
//Homeros
import HomerMonito from "../../../../assets/images/spiners-homers/homero-monito.gif"

const AddCoupons = ({STORE_USER, t}) => {

    //USER IDENTIFICATION #########################################################################
    let userStore = STORE_USER.user && STORE_USER.user.data && STORE_USER.user.data.user
        ? STORE_USER.user.data.user
        : null;
    let user = {
        userStatus: userStore ? true : false,
        id: userStore && userStore.id ? userStore.id : 0,
        orderId: STORE_USER.cartDetaills.id ? STORE_USER.cartDetaills.id : 0,
        rol: userStore && userStore.rol ? userStore.rol : 0,
    };

    // HOOK useForm ###############################################################################
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [postLoading, setPostLoading] = useState(false);

    // FUNCTION  onSubmit #########################################################################
    const onSubmit = (data) => {

        let coupon = {
            coupon: data.couponName,
            discount: data.couponDiscount
        };

        return postCategorie(coupon);
    };

    // FUNCTION postCategorie ####################################################################
    const postCategorie = async (coupon) => {

        setPostLoading(true);

        const options = {
            method: 'POST',
            url: `${serverUrl}/coupons`,
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token")
            },
            data: { coupon: coupon.coupon, discount: coupon.discount }
        };

        return await axios.request(options).then(response => {

            setTimeout(() => {
                return setPostLoading(false);
            }, 1000);

            //errors back handles
            if (response.data.original && response.data.original.code === "23505") {
                swal(`The coupon already exists`);
            } else if (response.data.original) {
                swal(`Error coupon dont added`);
            } else if (response.data.errors && response.data.errors[0].message === "invalid coupon name length") {
                swal(`invalid coupon name length`);
            } else {
                //category added
                swal(`Add coupon Successful`);
            };

        }).catch(error => {
            swal(`${error}`);
        });
    };

    return (
        <>{user && user.rol === "admin"
            ? (
                <>
                    <AdminNav />
                    <div className="--add-categories-main">
                        <h1>Add AddCoupons</h1>
                        <div className="--add-categories-form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    {/* INPUT CATEGORIE NAME  */}
                                    <label
                                        name="--add-categories-form-categorie-name">
                                        Coupon name
                                    </label>
                                    <input
                                        name="couponName"
                                        autoComplete="off"
                                        placeholder="Coupon name"
                                        className="--add-categories-form-input-name"
                                        {...register("couponName", { required: true }, { minLength: 2, maxLength: 12 })}
                                        type="text" />
                                    {/* errors will return when field validation fails  */}
                                    {errors.couponName && <span>Este campo no puede estar vacio</span>}
                                    {errors.couponName && errors.couponName.type === 'minLength' && (
                                        <span>This is field required min lengh</span>)}

                                </div>
                                <div>
                                    {/* INPUT CATEGORIE DESCRIPTION  */}
                                    <label
                                        name="--add-categories-form-categorie-description">
                                        Discount
                                    </label>
                                    <input
                                        name="couponDiscount"
                                        autoComplete="off"
                                        placeholder="ingrese el descuento"
                                        className="--add-categories-form-input-description"
                                        {...register("couponDiscount", { required: true })}
                                        type="text" />
                                    {/* errors will return when field validation fails  */}
                                    {errors.couponDiscount && <span>Este campo no puede estar vacio</span>}
                                </div>
                                <div>
                                    <button type="submit">
                                        {postLoading
                                            ? (
                                                <img src={spinner} alt="spiner"></img>
                                            ) : (
                                                "Agregar cupon"
                                            )
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className={"--add-categories-homer"}>
                            {errors.couponDiscount || errors.couponName
                                ? (
                                    <img
                                        src={HomerMonito} alt="homer error"></img>
                                ) : (
                                    ""
                                )
                            }
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <h1>Acceso Denegado Only Admin Can Be See This Page</h1>
                </div>
            )
        }</>
    )
}

const mapStateToProps = (state) => {
    return {
        STORE_USER: state.userReducers
    };
};

export default connect(mapStateToProps)(withTranslation()(AddCoupons));