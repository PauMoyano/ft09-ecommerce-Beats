import "./Login.css";
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
//import images
import logoIcon from "../../../assets/images/icon-logo.png"
import flagEN from "../../../assets/images/estados-unidos.png";
import flagSP from "../../../assets/images/espana.png"
//Internationalization
import i18n from '../../../i18n';
import { withTranslation } from 'react-i18next';
import {serverUrl} from '../../../auxiliar/variables';

import { useDispatch } from 'react-redux'
import {addItemToCart} from "../../../stores/user/user.actions";

const Login = ({t}) => {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: "",
        password:""
    });

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      } 

    const history = useHistory();
    var tokenVerify = localStorage.getItem("token")

    if(tokenVerify){
        setTimeout(()=> history.push('/profile'),100)
    }
   
    const handleInputChange =(e) => {
        setInput({
             ...input,
             [e.target.name]: e.target.value
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Esto me trae el input', input)
        let newUser = {
             email:input.email,
             password: input.password,
            }
       
        return await axios.post(`${serverUrl}/users/login`, newUser)
        .then((user)=>{            

            let email = JSON.parse(user.config.data)
            localStorage.setItem("token",user.data.token)
            localStorage.setItem("refreshToken",user.data.refreshToken)
            localStorage.setItem("email", email.email)
            
            if(user.data.token){
                JSON.parse(localStorage.getItem("localCart")).forEach((product)=>{
                    const dataUser = {
                        userStatus: true,
                        orderId: user.data.user.orderId
                    }
                    dispatch(addItemToCart(dataUser, product.product))
                })
                return history.push('/profile')
            }else{
                console.log("Error de inicio de sesion")
            }
            
        })   
       .catch((error)=>{
            console.log(error)
        })
    }
    const loginGitHub = async (e) => {
        e.preventDefault();  
        window.open(`${serverUrl}/auth/github/`, "_self")

    }

    const loginGoogle = async (e) => {
        e.preventDefault();
        window.open(`${serverUrl}/auth/google/`, "_self")
    }

    return(
        <div className="--LoginCard">
            <div className="--LoginAllCard">
                <div className="--login-logo">
                    <div className="--login-logo-col">
                    <div className='--login-flags' onClick={() => changeLanguage('en')}>
                        <img className='--flag-en' src={flagEN} alt="flagENGLISH" width="25px" height="25px"/>
                    </div>
                        <Link className="--login-logo-col-link" to='/'>
                            <img width="60px" height="50px" src={logoIcon} alt=""></img>
                        </Link>
                    </div>
                    <div className="--login-logo-col">
                        <Link className="--login-logo-col-link" to='/'>
                            <h1>BeatStore</h1>
                        </Link>                          
                    <div className='--login-flags' onClick={() => changeLanguage('es')}>
                        <img className='--flag-es' src={flagSP}alt="flagSPANISH" width="25px" height="25px"/>
                    </div>
                    </div>
                </div>
            <form onSubmit={handleSubmit} className="--LoginCard-form">
                <div className="--LoginCard-form-identification">
                    <p className="name">{t("page.login.emailTitle")}</p>
                    <input className="--LoginCard-form-input" 
                        type="email" 
                        placeholder={t("page.login.emailPlaceholder")}
                        name="email" 
                        required
                        onChange={handleInputChange} 
                        value={input.email}/>
                </div>
                <div className="--LoginCard-form-credential">
                    <p className="name">{t("page.login.passwordTitle")}</p>
                    <input className="--LoginCard-form-input" 
                        type="password" 
                        placeholder={t("page.login.passwordPlaceholder")}
                        name="password" 
                        required
                        onChange={handleInputChange} 
                        value={input.password}/>
                </div>
                <div className="--Submit--buttons">
                    <button id='normal' type='submit'>{t("page.login.signinButton")}</button>
                    <button id="github" onClick={loginGitHub}> Github </button>
                    <button id='google' onClick={loginGoogle}> Google </button>
                </div>

            </form>
            <div className="foot">
                <Link to='/register' className='Link-footer'>{t("page.login.dontAcount")}</Link>
                <Link to ='/resetpass' className='Link-footer'>{t("page.login.forgotPassword")}</Link>
                <Link className="signup--footer" to="/register">{t("page.login.signupButton")}</Link>  
            </div>
            </div>
        </div>
    )
}

export default withTranslation()(Login);