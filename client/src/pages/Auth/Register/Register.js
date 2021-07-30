import "./Register.css"
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import swal from "sweetalert";
import {serverUrl} from "../../../auxiliar/variables"
//import images
import logoIcon from "../../../assets/images/icon-logo.png";
import flagEN from "../../../assets/images/estados-unidos.png";
import flagSP from "../../../assets/images/espana.png"
//Internationalization
import i18n from '../../../i18n';
import { withTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';
const Register = ({t}) => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        username: "",
        password:"",
        confirmPassword:"",
        email:"",
    });

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      } 

    const handleInputChange =(e) => {
        setInput({
             ...input,
             [e.target.name]: e.target.value
             
        });

        setErrors(validate({
             ...input,
             [e.target.name]: e.target.value
        }));
        
      };
      

    const validate = (input) => {
        let errors = {};
        if (!input.username) {
            errors.username = 'Username is required';
        } else if (!/\S+@\S+\.\S+/.test(input.username)) {
             errors.username = 'Username is invalid';
        }
        if (input.password && input.password === 'invalid password') {
             errors.password = 'Password is required';
        } else if (!/(?=.*[0-9])/.test(input.password)) {
             errors.password = 'Password is invalid';
        }
        return errors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUser = {
            name:input.username,
             password: input.password,
             email: input.email
            }
       await axios.post(`${serverUrl}/users`, newUser)
       .then((user)=>{
           if(user.data.msg === 'email aready exist'){
            setErrors({
                email:'email aready exist'
            })
           }
           if(user.data.msg === 'invalid password'){
            setErrors({
                password:'invalid password'
            })
           }
           if(user.data.msg === 'user already exist'){
                return history.push('/register')
            }
            if(user.data.msg === null){
                return history.push('/login')
            }         
       })   
       .catch((error)=>{
            console.log(error)
        })
    }
    const handleThanksReg = () =>{
           swal("Thanks for register,an email was sent to your acount!") 
           let mail = {
            name:input.username,
             password: input.password,
             email: input.email
            }
        emailjs.send('service_wh6ybz2', 'template_jhy0w4e', mail, 'user_TgPSia94H5R5iet7h197p')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
        setTimeout(()=>{
            history.push('/login')
        },4000)
    }

    return(
        <div className="--RegisterCard">
            <div className="--RegisterCardAll">
                <div className="--login-logo">
                    <div className='--register-flags' onClick={() => changeLanguage('en')}>
                        <img src={flagEN} alt="flagENGLISH" width="25px" height="25px"/>
                    </div>
                    <div className="--login-logo-col">
                        <Link className="--register-Link" to="/"> <img width="60px" height="50px" src={logoIcon} alt=""></img> </Link>
                    </div>
                    <div className="--login-logo-col">
                       <Link className="--register-Link" to="/"> <h1>BeatStore</h1> </Link>
                    </div>
                    <div className='--register-flags' onClick={() => changeLanguage('es')}>
                        <img src={flagSP}alt="flagSPANISH" width="25px" height="25px"/>
                    </div>
                </div>
            <form onSubmit={handleSubmit} className="--RegisterCard-form">
                <div className="--RegisterCard-form-email">
                    <p className='name'>{t("page.register.emailTitle")}</p>
                    <input className="--RegisterCard-form-input" 
                        type="text" 
                        placeholder={t("page.register.emailPlaceholder")}
                        name="email" 
                        onChange={handleInputChange} 
                        value={input.email}
                        required/>
                    
                    {errors.email && errors.email === 'email aready exist'
                    ?
                    (<p className="alert alert-danger">{errors.email}</p> ):
                    (
                      <p>  </p>
                    )
                     }
                </div>

                <div className="--RegisterCard-form-username">
                    <p className='name'>{t("page.register.usernameTitle")}</p>
                    <input className="--RegisterCard-form-input" 
                        type="text" 
                        placeholder={t("page.register.usernamePlaceholder")}
                        name="username" 
                        onChange={handleInputChange} 
                        value={input.username}
                        required/>
                        {/* {errors.username && <p className="danger">{errors.username}</p>} */}
                </div>
                <div className="--RegisterCard-form-password">
                    <p className='name'>{t("page.register.passwordTitle")}</p>
                    <input className="--RegisterCard-form-input" 
                        type="password" 
                        placeholder={t("page.register.passwordPlaceholder")}
                        name="password" 
                        onChange={handleInputChange} 
                        value={input.password}
                        required/>

                    {errors.password && errors.password === 'invalid password'
                    ?
                    (<p className="alert alert-danger">{errors.password}</p> ):
                    (
                      <p>  </p>
                    )
                     }
                    
                </div>
                <div className="--RegisterCard-form-password-repeat">
                    <p className='name'>{t("page.register.confirmPasswordTitle")}</p>
                    <input className="--RegisterCard-form-input" type="password" placeholder={t("page.register.confirmPasswordPlaceholder")}
                        name="confirmPassword" onChange={handleInputChange} value={input.confirmPassword}/>
                </div>
                <button 
                type="submit"
                onClick={handleThanksReg}
                >{t("page.register.signupButton")}</button>
            </form>
            <div className="foots">
                <Link to='/login' className='Link'>{t("page.register.haveAcount")}</Link>
            </div>
            </div>
            
        </div>
    )
}

export default withTranslation()(Register);