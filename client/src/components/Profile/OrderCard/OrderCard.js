import "./OrderCard.css";
import React from "react";
import { useHistory } from "react-router-dom";
//Internationalization
import { withTranslation } from 'react-i18next';

const OrderCard = ({t, id, status, orderLines, createdAt }) => {

    const history = useHistory();

    function handleClick() {
        history.push(`profile/order/${id}`);
    }

    const totalPrice = orderLines.map(order => parseFloat(order.price))
    return (
        <div className="--OrderCard">
            <div className="--OrderCard-data">
                <div className="--OrderCard-data-date">
                    <span>{t('components.profile.orderCard.created')}{createdAt}</span>
                </div>
                <div className="--OrderCard-data-number">
                    <span>{t('components.profile.orderCard.order')} {id}</span>
                </div>
                <div className="--OrderCard-data-value">
                    <span>

                    {t('components.profile.orderCard.price')} ${
                            totalPrice && totalPrice.length > 0 ? (
                                totalPrice.reduce((accumulator, currentValue) => {
                                    return accumulator + currentValue
                                })
                            ) : (<span>0</span>)

                        }</span>
                    <br/>
                    <span>{t('components.profile.orderCard.quantity')} {orderLines.length}</span>
                </div>
                <div className="--OrderCard-data-status">
                    <span>{t('components.profile.orderCard.status')} {status}</span>
                </div>
            </div>
            <div className="--OrderCard-detail-btn">
                <button onClick={handleClick}>{t('components.profile.button')}</button>
            </div>
        </div>
    )
};

export default withTranslation()(OrderCard);