import './adminSubscriptionsLayoutNav.scss';
import React from 'react';
import {Link} from 'react-router-dom';

const AdminSubscriptionsNav = () =>{

    return (
        <div className="admin-subscriptionsnav-main">
            <ul className="admin-subscriptionsnav-main-ul">
            <li className="admin-subscriptionsnav-main-li">
                    <Link className="admin-subscriptionsnav-main-link"
                     to="/adminsubscriptions/">Dashboard</Link>
                </li>
                <li className="admin-subscriptionsnav-main-li">
                    <Link className="admin-subscriptionsnav-main-link"
                     to="/adminsuscriptions/customers">Customers</Link>
                </li>
                <li className="admin-subscriptionsnav-main-li">
                    <Link className="admin-subscriptionsnav-main-link"
                    to="/adminsuscriptions/products">Products</Link>
                </li>
                <li className="admin-subscriptionsnav-main-li">
                    <Link className="admin-subscriptionsnav-main-link"
                    to="/adminsuscriptions/paymentintests">PaymentIntests</Link>
                </li>
                <li className="admin-subscriptionsnav-main-li">
                    <Link className="admin-subscriptionsnav-main-link" 
                    to="/adminsuscriptions/payouts">Payouts</Link>
                </li>
                <li className="admin-subscriptionsnav-main-li">
                    <Link className="admin-subscriptionsnav-main-link"
                    to="/adminsuscriptions/setupAttempts">SetupAttempts</Link>
                </li>
                <li className="admin-subscriptionsnav-main-li">
                    <Link className="admin-subscriptionsnav-main-link"
                    to="/adminsuscriptions/setupIntets">SetupIntets</Link>
                </li>
                <li className="admin-subscriptionsnav-main-li">
                    <Link className="admin-subscriptionsnav-main-link"
                    to="/adminsuscriptions/subscriptions">Subscriptions</Link>
                </li>
                <li className="admin-subscriptionsnav-main-li">
                    <Link className="admin-subscriptionsnav-main-link"
                    to="/adminsuscriptions/prices">Prices</Link>
                </li>
                <li className="admin-subscriptionsnav-main-li">
                    <Link className="admin-subscriptionsnav-main-link"
                    to="/adminsuscriptions/invoices">Invoices</Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminSubscriptionsNav