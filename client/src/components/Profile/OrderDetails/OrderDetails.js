//import "./listProduct.css";
import React from "react";

import { connect } from "react-redux";
import { useParams } from 'react-router';
import {serverUrl} from '../../../auxiliar/variables';

const OrderDetails = ({ USER_ORDERS }) => {
    const { id } = useParams();
    // const totalPrice = order[0].orderLines.map(order => parseFloat(order.price))
    const order = USER_ORDERS.find((order)=>parseInt(order.id) === parseInt(id))
    const totalPrice = order.orderLines.map(order => parseFloat(order.price))


    return (
        <div>
            <div className="--Orders">
                <div className="--Orders">
                    {order ? (
                        <>
                            <div>
                                {order.orderLines.map((product, index) => {
                                    return (
                                        <div key={index} className="--ItemCard">
                                            <div className="--ItemCard-left">
                                                <img
                                                    alt="albumImg"
                                                    src={`${serverUrl}/images/${product.product.image}`}
                                                />
                                                <div className="--ItemCard-data">
                                                    <h2>{product.product.name}</h2>
                                                    <p>{product.product.artist}</p>
                                                </div>
                                            </div>
                                            <div className="--ItemCard-right">
                                                <h1 style={{color: "white",fontFamily: 'Oxanium',fontSize:"1.5rem"}}>
                                                    ${product.product.price}
                                                </h1>
                                                <span >

                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}

                                <h1 className="total" style={{color: "white",fontFamily: 'Oxanium'}}>Total price: $
                                    {
                                        totalPrice && totalPrice.length > 0 ? (
                                            totalPrice.reduce((accumulator, currentValue) => {
                                                return accumulator + currentValue
                                            })

                                        ) : (
                                            <div> </div>
                                        )

                                    }

                                </h1>

                            </div>
                        </>
                    ) : (
                        <p className="empty-cart">Empty Cart</p>
                    )
                    }
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        USER_ORDERS: state.userReducers.orders,
    };
};

export default connect(mapStateToProps)(OrderDetails);
