import axios from 'axios';
import React from 'react';
import {useParams, useHistory } from "react-router-dom";
import {serverUrl} from '../../../auxiliar/variables';
import { useDispatch } from 'react-redux'
import {addItemToCart} from "../../../stores/user/user.actions";

const LoginGitHub = () =>{
    const dispatch = useDispatch();
    const history = useHistory();

    const {email,password} = useParams();

    axios.post(`${serverUrl}/users/login`, {email,password}).then((user)=>{
        let email2 = JSON.parse(user.config.data)

        localStorage.setItem("token",user.data.token)
        localStorage.setItem("email", email2.email)

        JSON.parse(localStorage.getItem("localCart")).forEach((product)=>{
            const dataUser = {
                userStatus: true,
                orderId: user.data.user.orderId
            }
            dispatch(addItemToCart(dataUser, product.product))
        })

        history.push("/")
    })
    return (

        <div>
            <h1>HOLA</h1>
        </div>
    )
}
  
  
export default LoginGitHub;