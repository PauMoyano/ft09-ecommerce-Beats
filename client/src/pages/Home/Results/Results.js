
import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { useParams } from "react-router-dom"
import ResultCard from '../../../components/ResultCard/ResultCard';
import ResultCardUser from '../../../components/ResultCard/ResultCardUser';

import {searchProducts} from "../../../stores/products/products.actions";
import {searchUser} from "../../../stores/user/user.actions";
import "./Results.css"

const Results = ({STORE_PRODUCTS, SEARCH_EFFECT, SEARCH_EFFECT_USER}) => {

    const {name} = useParams();
    const products = STORE_PRODUCTS.productsReducers.searchResults;
    const users = STORE_PRODUCTS.userReducers.searchResultsUser;
    const logueado = STORE_PRODUCTS.userReducers;

    
        useEffect(()=>{
            SEARCH_EFFECT(name)
        },[SEARCH_EFFECT,name])
        useEffect(()=>{
            SEARCH_EFFECT_USER(name)
        },[SEARCH_EFFECT_USER,name])

        
    return (
        <div className="--Results">
            <h1>Search results:</h1>
            {products && products.length > 0 ? (
                <>
                    <h1>Products results:</h1>
                    <div className="--Results-items">
                        {
                            products.map((product,id)=>
                                <ResultCard product={product} key={id}/>
                            )
                        }
                    </div>
                </>
            ) : (
                <>
                    <h1>Products results:</h1>
                    <h1>We have not found products that match your search.</h1>
                </>
            )}
            <></>
            {users && users.length > 0 ? (
                <>
                    <h1>Users results:</h1>
                    <div className="--Results-items-user">
                        {
                            users.map((user)=>
                              <ResultCardUser userResult={user} key={user.id}/>
                            )
                        }
                    </div>
                </>
            ) : (
                <>
                    <h1>Users results:</h1>
                    <h1>We have not found user that match your search.</h1>
                </>
            )}
        </div>
    )
}

function mapStateToProps(state) {
    return {
    STORE_PRODUCTS: state,
    };
  }

function mapDispatchToProps(dispatch) {
    return {
    SEARCH_EFFECT: (name) => {dispatch(searchProducts(name))},
    SEARCH_EFFECT_USER: (name) => {dispatch(searchUser(name))}
    };
  }


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Results);