import React from "react"
import { Link } from "react-router-dom";
import "./resultCardUser.css"

import { connect } from "react-redux";
import { addItemToCart } from "../../stores/user/user.actions";
import { show } from 'js-snackbar';
import {serverUrl} from '../../auxiliar/variables';

const ResultCardUser = ({ userResult , STORE_USER }) => {

    
    
    //USER IDENTIFICATION FOR REDUCER #############################################
    let userStore = STORE_USER.user && STORE_USER.user.data && STORE_USER.user.data.user ? STORE_USER.user.data.user : null ; 
    
    
   
    
    return (
        <>
        {userResult ? (
            <div className="--ResultCardUser">
            <div className="--ResultCardUser-content">
            <div className="--ResultCardUser-img">
                <img src={`${serverUrl}/images/${userResult.image}`} alt='productImage' />
            </div>
            <div className="--ResultCardUser-info">
                <div className="--ResultCardUser-info-name">
                    {userStore && userStore.id === userResult.id ? (
                      <Link to={`/profile`}>{userResult.name}</Link>
                    ):(
                      <Link to={`/publicProfile/${userResult.id}`}>{userResult.name}</Link>
                    )}
                    
                </div>
            </div>
            </div>
            </div>
            ):(<div>Hola</div>)
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        STORE_PRODUCTS: state.productsReducers,
        STORE_USER : state.userReducers
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCartEffect: (user, product) => dispatch(addItemToCart(user, product)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultCardUser);
