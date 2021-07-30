import React from "react";
import {useHistory} from "react-router-dom"
import "./listproducts.scss";
import {serverUrl} from "../../../../auxiliar/variables";


const ListProducts = ({id, name, image, artist, description, addOfert})=>{

    const history = useHistory();
    
    const handleClick = ()=>{
        history.push(`/admin/oferts/add/${id}`)
        return addOfert(id)
    }
    
    return (
        <>
        <div className="--admin-list-main">
            <div className="--admin-list-main-img">
                <img width="100px" height="100px" src={`${serverUrl}/images/${image}`} alt="User ph"/>
            </div>
            <div className="--admin-list-main-details">
                <p>Id : {id}</p>
                <p>{name}</p>
            </div >
            <div className="--admin-list-main-btn">
                <button
                className="--admin-list-main-btn-button"
                onClick={handleClick}
                >Add Ofert</button>
            </div>
        </div>
        </>
       
    )
};


export default ListProducts;