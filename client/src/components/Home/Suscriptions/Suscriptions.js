import React from 'react';
import './suscriptions.scss'
import { withTranslation } from 'react-i18next';
//IMAGES
import RatImg from './images/Rat.svg'
import MonkeyImg from './images/Monkey.svg'
import TigerImg from './images/Tiger.svg'
import LionImg from './images/lion.png'
const Suscriptions = ({t})=>{
    return (
        <div className='--allSubscriptions'>
            <h2>{t("page.home.subscriptions.title")}</h2>
        <div className="--suscriptions-main">
            
            <div className="--suscriptions-main--col">
                <div className='--subscription-title'>
                    <p>Rat</p>
                    <p>Subscription</p>  
                </div>
                <img width="150px" height="150px" alt="" src={RatImg}></img>
                <ul>
                    <li>{t("page.home.subscriptions.rat.list.1")}</li>
                    <li>{t("page.home.subscriptions.rat.list.2")}</li>
                    <li>{t("page.home.subscriptions.rat.list.3")}</li>
                    <li>{t("page.home.subscriptions.rat.list.4")}</li>
                    <li>{t("page.home.subscriptions.rat.list.5")}</li>
                    <li>{t("page.home.subscriptions.rat.list.6")}</li>
                   
                </ul>
                <button>{t("page.home.subscriptions.button")}</button>
            </div>
            <div className="--suscriptions-main--col">
            <div className='--subscription-title'>
                    <p>Monkey</p>
                    <p>Subscription</p>  
                </div>
                <img width="150px" height="150px" alt="" src={MonkeyImg}></img>
                <ul>
                    <li>{t("page.home.subscriptions.monkey.list.1")}</li>
                    <li>{t("page.home.subscriptions.monkey.list.2")}</li>
                    <li>{t("page.home.subscriptions.monkey.list.3")}</li>
                    <li>{t("page.home.subscriptions.monkey.list.4")}</li>
                    <li>{t("page.home.subscriptions.monkey.list.5")}</li>
                    <li>{t("page.home.subscriptions.monkey.list.6")}</li>
                </ul>
                <button>{t("page.home.subscriptions.button")}</button>
            </div>
            <div className="--suscriptions-main--col">
            <div className='--subscription-title'>
                    <p>Cougar</p>
                    <p>Subscription</p>  
                </div>
                <img width="150px" height="150px" alt="" src={TigerImg}></img>
                <ul>
                    <li>{t("page.home.subscriptions.cougar.list.2")}</li>
                    <li>{t("page.home.subscriptions.cougar.list.3")}</li>
                    <li>{t("page.home.subscriptions.cougar.list.4")}</li>
                    <li>{t("page.home.subscriptions.cougar.list.5")}</li>
                    <li>{t("page.home.subscriptions.cougar.list.6")}</li>
                    <li>{t("page.home.subscriptions.monkey.list.6")}</li>
                </ul>
                <button>{t("page.home.subscriptions.button")}</button>
            </div>
            <div className="--suscriptions-main--col">
            <div className='--subscription-title'>
                    <p>Lion</p>
                    <p>Subscription</p>  
                </div>
                <img width="150px" height="150px" alt="" src={LionImg}></img>
                <ul>
                    <li>{t("page.home.subscriptions.lion.list.2")}</li>
                    <li>{t("page.home.subscriptions.lion.list.3")}</li>
                    <li>{t("page.home.subscriptions.lion.list.4")}</li>
                    <li>{t("page.home.subscriptions.lion.list.5")}</li>
                    <li>{t("page.home.subscriptions.lion.list.6")}</li>
                    <li>{t("page.home.subscriptions.monkey.list.6")}</li>
                </ul>
                <button>{t("page.home.subscriptions.button")}</button>
            </div>
        </div>
        </div>
    )
};

export default withTranslation()(Suscriptions);