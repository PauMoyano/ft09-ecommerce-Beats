import './ResetPass.css';
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
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

const ResetPass = ({t}) => {

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  } 
    
    function generateResetCode() {
        let length = 9,
          charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
      }

    const [input, setInput] = useState({
        name: "",
        email: "",
        code: "",
    });

    const handleInputChange =(e) => {
        setInput({
             ...input,
             [e.target.name]: e.target.value,
             code: generateResetCode(),
        });
      };

    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            await axios.get(`${serverUrl}/getname/${input.email}`)
              .then((user) => { 
                setInput({
                  ...input,
                  name: user.data.name,
                  action_url: 'http://localhost:3000/inscode',
                  subscription: user.data.subscription,
              })
            }, (error) => {
                console.log(error.message);
            });
             
        } catch(err){
          console.log(err.message)
        } finally {
          await emailjs.send('service_b9mqvzg', 'template_j7o69td', input, 'user_G41cbN7fW7VHqXdcmtBXT')
          .then((result) => {
            console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          await axios.post(`${serverUrl}/users/resetcode`, input)
              .then((text) => {
                console.log(text);
            }, (error) => {
                console.log(error.message);
            });
        }
    }
    
    return( 
        <div className="--ResetCard">
          <div className="--ResetAllCard">
            <div className="--Reset-logo">
              <div className='--Reset-flags' onClick={() => changeLanguage('en')}>
                        <img src={flagEN} alt="flagENGLISH" width="25px" height="25px"/>
                    </div>
                  <div className="--Reset-logo-col">
                  <Link className="--Reset-link" to='/'>
                      <img width="60px" height="50px" src={logoIcon} alt=""></img>
                  </Link>
                  </div>
                  <div className="--Reset-logo-col">
                  <Link className="--Reset-link" to='/'>
                    <h1>BeatStore</h1>
                  </Link>
                  </div>
                  <div className='--Reset-flags' onClick={() => changeLanguage('es')}>
                        <img src={flagSP}alt="flagSPANISH" width="25px" height="25px"/>
                    </div>
            </div>
            <h2>{t('page.resetPass.line1')}</h2>
            <h2>{t('page.resetPass.line2')}</h2>
            <h2>{t('page.resetPass.line3')}</h2>
            <form className="--ResetPass" onSubmit={sendEmail}>
              <label className='name'>Email</label>
              <input 
                placeholder={t('page.resetPass.email.placeholder')}
                className="--RPInput" 
                onChange={handleInputChange} 
                type="email" 
                name="email" required/>
              <div className="--RPButtons">
                <button type='submit'>{t('page.resetPass.code')}</button>
              </div>
            </form>
            <Link className='Link' to='/inscode'>Already have the Code?</Link>
          </div>
        </div>
    )
}

export default withTranslation()(ResetPass);