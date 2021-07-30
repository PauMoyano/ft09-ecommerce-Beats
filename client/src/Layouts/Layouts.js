import "./Layouts.css";
import React from 'react';
import Footer from '../components/Footer/Footer';
import HeaderHome from '../components/Header/HeaderHome/HeaderHome';
import HeaderAdmin from '../components/Header/HeaderAdmin/HeaderAdmin';
import HeaderPages from '../components/Header/HeaderPages/HeaderPages';

//Components Admin Subscriptions
import AdminSubscriptionsNav from '../pages/AdminSubscriptions/AdminSubscriptionsNav/AdminSubscriptionsNav';
import HeaderPrint from "../components/Header/HeaderPrint/HeaderPrint";


const HomeLayout = ({ children }) => {
    return (
        <div>
            <HeaderHome/>
                {children}
            <Footer/>
        </div>
    )
};
const PagesLayout = ({ children }) => {
    return (
        <div>
            <HeaderPages></HeaderPages>
            <div className="page-layout-main">
                {children}
            </div>
        </div>
    )
};

const ProfileLayout = ({ children }) => {
    return (
        <div>
            <HeaderPages></HeaderPages>
            <div className="profile-layout-main">
                {children}
            </div>
        </div>
    )
};

const ProductLayout = ({ children }) => {
    return (
        <div>
            <HeaderHome></HeaderHome>
                {children}
        </div>
    )
};
const AdminLayout = ({ children }) => {
    return (
        <div>
            <HeaderAdmin></HeaderAdmin>
            {children}
        </div>
    )
};
const AdminSubscriptionsLayout = ({ children }) => {
    return (
        <div>
            <HeaderAdmin></HeaderAdmin>
            <AdminSubscriptionsNav/>
            {children}
        </div>
    )
};
const LoginLayout = ({ children }) => {
    return (
        <div className="--Header-Login-bg">
            {children}
        </div>
    )
};

const PrintLayout = ({ children }) => {
    return (
        <div>
            <HeaderPrint/>
            <div className="page-layout-main">
                {children}
            </div>
        </div>
    )
};

export { HomeLayout, PagesLayout, LoginLayout, AdminLayout, ProductLayout, AdminSubscriptionsLayout,ProfileLayout,PrintLayout };