import './InsCode.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import images
import logoIcon from "../../../assets/images/icon-logo.png";
import flagEN from "../../../assets/images/estados-unidos.png";
import flagSP from "../../../assets/images/espana.png";
//Internationalization
import i18n from '../../../i18n';
import { withTranslation } from 'react-i18next';
import {serverUrl} from '../../../auxiliar/variables';
const InsCode = ({t}) => {
    
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      } 

    const [input, setInput] = useState({
        pass: "",
        code: "",
        confPass: "",
    });

    const [errors, setError] = useState({
        code: "",
        confPass: ""
    })

    const handleInputChange =(e) => {
        setInput({
             ...input,
             [e.target.name]: e.target.value,
        });
      };

    const validate = () => {
        let isValid = true;
        if(input.pass !== input.confPass){
            setError({
                ...errors,
                confPass: "Passwords don´t match"
            })
            isValid = false;
        }
        if(input.code.length !== 9){
            setError({
                ...errors,
                code: "Reset Code is invalid or expired"
            })
            isValid = false;
        }
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate()){
            axios.put(`${serverUrl}/users`, input)
            .then((result) => {
              console.log(result);
          }, (error) => {
              console.log(error);
          });
        }
        // e.reset()
    }

    return( 
    <div className="--CodeCard">
        <div className="--CodeAllCard">
            <div className="--Code-logo">
                <div className='--Code-flags' onClick={() => changeLanguage('en')}>
                        <img src={flagEN} alt="flagENGLISH" width="25px" height="25px"/>
                    </div>
                  <div className="--Code-logo-col">
                      <img width="60px" height="50px" src={logoIcon} alt=""></img>
                  </div>
                  <div className="--Code-logo-col">
                  <h1>BeatStore</h1>
                  </div>
                    <div className='--Code-flags' onClick={() => changeLanguage('es')}>
                        <img src={flagSP}alt="flagSPANISH" width="25px" height="25px"/>
                    </div>
            </div>
                <h2>{t('page.Code.line1')}</h2>
                <h2>{t('page.Code.line2')}</h2>
            <form className="--CodeForm" onSubmit={handleSubmit}>
                <input type="hidden" name="contact_number" />
                <label className='name'>{t('page.Code.titleLabel')}</label>
                <input 
                    className='--CodeForm-input'
                    placeholder={t('page.Code.placeholder.reset')}
                    onChange={handleInputChange} 
                    type="text" 
                    name="code" 
                    required/>
                {errors.code && errors.code === 'Reset Code is invalid or expired'
                    ?
                    (<p className="alert alert-danger">{errors.code}</p> ):
                    (
                      <p>  </p>
                    )
                     }
                <label className='name'>{t('page.Code.password1')}</label>
                <input  
                    className='--CodeForm-input'
                    placeholder={t('page.Code.placeholder.password2')}
                    onChange={handleInputChange} 
                    type="password" 
                    name="pass"
                    id="pass" 
                    required/>
                <label className='name'>{t('page.Code.confirm1')}</label>
                <input 
                    className='--CodeForm-input'
                    placeholder={t('page.Code.placeholder.confirm2')}
                    onChange={handleInputChange} 
                    type="password" 
                    name="confPass" 
                    id="confPass"
                    required/>
                {errors.confPass && errors.confPass === 'Passwords don´t match'
                    ?
                    (<p className="alert alert-danger">{errors.confPass}</p> ):
                    (
                      <p>  </p>
                    )
                     }
                <div className="--CodeButtons">
                    <button type='submit'>{t('page.Code.password3')}</button>
                </div>
            </form>
            <Link className='Link' to='/login'>{t('page.Code.back')}</Link>
        </div>
    </div>
  ) 
}
export default withTranslation()(InsCode);