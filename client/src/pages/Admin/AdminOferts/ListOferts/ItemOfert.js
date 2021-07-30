import React from "react";
import "../ListProducts/listproducts.scss";
//import {serverUrl} from "../../../../auxiliar/variables";


const itemOfert = ({idOfert, name, ofertStatus, discount})=>{

    const handleClick = ()=>{
        let object={
            idOfert,
            name,
            ofertStatus,
            discount,
        }
        alert(JSON.stringify(object))
    }
    
    return (
        <>
        <div className="--admin-list-main">
            <div className="--admin-list-main-details">
                <p>idOfert : {idOfert}</p>
                <p>name : {name}</p>
                <p>ofertStatus : {ofertStatus}</p>
                <p>description : {discount}</p>
            </div >
            <div>
                <button
                onClick={handleClick}
                >Add Ofert to Product</button>
            </div>
        </div>
        </>
       
    )
};


export default itemOfert;