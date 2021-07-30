import React, { useState } from "react"
import TabBilling from "../../components/CheckoutTabs/TabBilling/TabBilling";
import CheckoutPay from "../CheckoutPay/CheckoutPay";
import "./Checkout.css"

const Checkout = () => {
    const [billing, setBilling] = useState(true);
    const [payout, setPayout] = useState(false);
    const [done, setDone] = useState(false);

    const [activeBilling, setActiveBilling] = useState(true);
    const [activePayout, setActivePayout] = useState(false);
    const [activeDone, setActiveDone] = useState(false);

    const handleClick = (tab) => {
        switch (tab) {
            case "billing":
                    setBilling(true)
                    setPayout(false)
                    setDone(false)
                    break
            case "payout":
                    setBilling(false)
                    setPayout(true)
                    setDone(false)
                    break
            case "done":
                    setBilling(false)
                    setPayout(false)
                    setDone(true)
                    
                    break
            default:
                break
        }
    }

    const formBillingComplete = () => {
        handleClick("payout");
        setActivePayout(true);
    }
    const paymentComplete = () => {
        handleClick("done");
        setActivePayout(false);
        setActiveBilling(false);
        setActiveDone(true);
    }

    return (
        <div className="--Checkout">
            <div className="--Checkout-tab">
                <div

                    className={activeBilling ? (billing ? "--Checkout-tab-active" : "--Checkout-tab-inactive") : "--Checkout-tab-disable"}
                    onClick={()=>handleClick(billing ? "" : "billing")}>
                    <p>Billing Info</p>
                </div>
                <div
                    className={activePayout ? (payout ? "--Checkout-tab-active" : "--Checkout-tab-inactive") : "--Checkout-tab-disable"}
                    onClick={()=>handleClick(payout ? "" : "payout")}>
                    <p>Payment</p>
                </div>
                <div
                    className={activeDone ? (done ? "--Checkout-tab-active" : "--Checkout-tab-inactive") : "--Checkout-tab-disable"}
                    onClick={()=>handleClick(done ? "" : "done")}>
                    <p>Purchase completed</p>
                </div>
            </div>
            {/* components */}

            <div className="--Checkout-content">
                <div className={billing ? "--Checkout-content-active" : "--Checkout-content-inactive"}>
                    <TabBilling f={formBillingComplete}/>
                </div>
                <div className={payout ? "--Checkout-content-active" : "--Checkout-content-inactive"}>
                    <CheckoutPay action={paymentComplete}/>
                </div>
                <div className={done ? "--Checkout-content-active" : "--Checkout-content-inactive"}>
                    <p>thank you for your purchase, you will soon receive an email</p>
                    <p>you will be redirected to home in two seconds</p>
                </div>
            </div>
        </div>
    )
}

export default Checkout