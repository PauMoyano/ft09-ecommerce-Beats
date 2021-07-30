import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { connect } from "react-redux";
import { useHistory } from "react-router-dom"

import {searchProducts} from "../../../stores/products/products.actions"
import {searchUser} from "../../../stores/user/user.actions"

// import Filter from "./Filter"

//Internationalization
import { withTranslation } from 'react-i18next';

import SearchImg from "./Search.png"
import './MiddleSearchBar.css'

const MiddleSearchBar = ({t}) => {
    const [input, setInput] = useState({
        name: ""
    })    

    const { name } = input

    const dispatch = useDispatch();

    const history = useHistory();

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchProducts(input.name));
        dispatch(searchUser(input.name));
        history.push(`/results/${input.name}`)

    }

    return (
     <form onSubmit={handleSubmit} className='HomeBg'>
         <div className="SearchBarMiddle">

             <input onChange={handleChange} autoComplete="off" name="name" value={name} placeholder={t("page.home.MiddleSearchBar")} />
                 <div className="ContainerImg">
                     <img onClick={handleSubmit} src={SearchImg} alt="SearchIcon" />
                     </div>


             {/* <Filter className="filtro" />  */}
         </div>
     </form>
    )
}


function mapStateToProps(state) {
    return {
    STORE_PRODUCTS: state
    };
  }

export default connect(
    mapStateToProps,
  )(withTranslation()(MiddleSearchBar));