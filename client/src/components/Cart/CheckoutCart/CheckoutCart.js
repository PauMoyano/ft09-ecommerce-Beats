import React, { useEffect, useState  } from "react"
import { connect } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getOrderByCheckoutId } from "../../../stores/user/user.actions"
import { withTranslation } from "react-i18next"
import spiner from "../../../assets/images/Spin-1s-200px.svg"
import moment from "moment"
import "./CheckoutCart.scss"

const CheckoutCart = ({ STORE_USER, getOrderByCheckoutIdEffect }) => {

    const {orderId} = useParams()

    useEffect(() => {
        getOrderByCheckoutIdEffect(orderId)
    }, [getOrderByCheckoutIdEffect])
    const products = STORE_USER.orderCheckout.orderLines

    const [visibility, setVisibility] = useState(true)

    const handlePrint = () => {
        setVisibility(false);
        setTimeout(()=>{
            return window.print();
        },500)
        setTimeout(()=>{
            return setVisibility(true);
        },4000)
    }

    return (
        <div className="--CheckoutCart">
            {STORE_USER.orderCheckoutLoading
                ? (
                    <div className="--CheckoutCart-loading">
                        <img alt="loading" src={spiner} />
                    </div>
                ) : (
                    <div className="--CheckoutCart-main">
                        <h1>Thanks for your purchase</h1>

                        <div className="--CheckoutCart-main-detail">
                            <div className="--CheckoutCart-main-detail-col">
                                <h2>Order details: </h2>
                            </div>
                            <div className="--CheckoutCart-main-detail-col">
                                <i className="fas fa-print" onClick={handlePrint}></i>
                            </div>
                        </div>
                        <div className="--CheckoutCart-main-total">
                            <span>Date</span><span>{moment().format(STORE_USER.orderCheckout.createdAt)}</span>
                        </div>
                        <div className="--CheckoutCart-main-company">
                            <span>Company</span><span>BeatStore</span>
                        </div>
                        <div className="--CheckoutCart-main-header">
                            <span>Item</span><span>Price</span>
                        </div>
                        {
                            products.map((product) => {
                                return (
                                    <div className="--CheckoutCart-main-item">
                                        <div className="--CheckoutCart-main-item-detail">
                                            <div className="--CheckoutCart-main-item-detail-name">
                                                <span>{product.product.name}</span>
                                            </div>
                                            <div className="--CheckoutCart-main-item-detail-artist">
                                                <span>{product.product.artist}</span>
                                            </div>
                                        </div>
                                        <div className="--CheckoutCart-main-item-price">
                                            <span>$ {product.product.price}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="--CheckoutCart-main-item">
                            <span>Discount</span><span>- ${STORE_USER.orderCheckout.discount}</span>
                        </div>
                        <div className="--CheckoutCart-main-total">
                            <p>Total</p><p>${STORE_USER.orderCheckout.total}</p>
                        </div>
                        <div className={ visibility ? "--CheckoutCart-main-button": "--hidden"}>
                            <Link to="/">Continue shopping</Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        STORE_USER: state.userReducers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrderByCheckoutIdEffect: (orderId) => dispatch(getOrderByCheckoutId(orderId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CheckoutCart));