import React, {useEffect, useState} from "react";
//Redux
import {connect} from "react-redux"
import {fetchUser} from '../../../stores/user/user.actions';
//Image import
import Logo from '../../../assets/images/icon-logo.png'
import flagEN from "../../../assets/images/estados-unidos.png";
import flagSP from "../../../assets/images/espana.png"
import menu from "../HeaderHome/menu.png"
//Route
import {Link} from 'react-router-dom'
//Internationalization
import i18n from '../../../i18n';
import { withTranslation } from 'react-i18next';
//CSS
import '../HeaderHome/header-home.scss';

const HeaderHome = ({t,fetchUserEffect, STORE_CART, STORE_USER}) =>{

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      } 

    const [dropDown, setDropDown] = useState(false)
      const handleDropDown = ()=>{
        dropDown ? setDropDown(false) : setDropDown(true)
      }

    useEffect(() => {
        fetchUserEffect();
      }, [fetchUserEffect]);

      const shortenText = (name) =>{
        var separado = name.split(" ")
        return separado[0]
       } 

    return (
      <>
        <div className="--header-home-main">
            <div className="--header-home-logo">
            <Link  to='/'><img className="--header-home-logo-image" src={Logo} alt="BeatShop"></img></Link>
            <Link className='--header-h1-link' to='/'><h1>BeatStore </h1></Link>
            </div> 
            
            <div className="--header-home-menu">
                <ul>
                    <Link className='--header-home-link' to='/catalog'><li>{t('headers.adminHeader.catalog')}</li></Link>
                    <Link className='--header-home-link' to='/oferts'><li>{t('headers.adminHeader.oferts')}</li></Link>
                    <Link className='--header-home-link' to='/ranking'><li>{t('headers.adminHeader.ranking')}</li></Link>
                    <div
                    onClick={handleDropDown}
                    className='--header-home-dropdown'>
                      <img src={menu} alt='menu' />
                    </div>

                </ul>
            </div>  
                    
            <div className="--header-home-perfil">
            {STORE_USER.user && STORE_USER.user.data
                ?(
                    <ul> 
                        <span className='--header-flags' onClick={() => changeLanguage('en')}><img src={flagEN} alt="flagENGLISH" width="25px" height="25px"/></span>
                        <span className='--header-flags' onClick={() => changeLanguage('es')}><img src={flagSP}alt="flagSPANISH" width="25px" height="25px"/></span> 
                       <li>
                         <Link className='--header-home-link-login' to='/profile'>
                         {shortenText(STORE_USER.user.data.user.name) || STORE_USER.user.data.user.email}
                         </Link>
                         </li>


                         <div className="--header-home-cart">
                            {STORE_USER.user.data.user.image ?(
                              <>
                              <span className="--user-imgProfile"> <img src={`http://localhost:3001/images/${STORE_USER.user.data.user.image}`} alt='imageProfile'/>  </span>
                              {STORE_USER.user && STORE_USER.user.data.user && STORE_USER.user.data.user.rol === 'admin' ?(
                                <Link className='--header-home-link-admin' to="/admin"><span className="material-icons icon-admin-user">admin_panel_settings</span>   </Link>                    
                               ):(
                                 <p></p>
                               )} 
                               </>
                              ):(
                              <Link className='--header-account-link' to='/profile'>
                                <span className="material-icons --user-img"> account_circle </span>
                              </Link>
                            )}
                         
                            
                            <Link to='/cart'><span className="material-icons --header-home-perfil-icon"> shopping_cart</span></Link>
                                <span className="--header-home-cart-item-length">
                                  {STORE_CART && STORE_CART.length > 0
                                  ?(
                                      STORE_CART.length
                                  ):(
                                      0
                                    )
                                   }
                                </span>
                        </div>   
                    </ul>
               ):(
                    <ul>
                        <span className='--header-flags' onClick={() => changeLanguage('en')}><img src={flagEN} alt="flagENGLISH" width="25px" height="25px"/></span>
                        <span className='--header-flags' onClick={() => changeLanguage('es')}><img src={flagSP}alt="flagSPANISH" width="25px" height="25px"/></span>
                       <Link className='--header-account-link' to='/profile'> <span className="material-icons --user-img"> account_circle </span></Link>
                        <div className="--header-home-cart">
                        <Link to='/cart'><span className="material-icons --header-home-perfil-icon"> shopping_cart</span></Link>
                                <span className="--header-home-cart-item-length">
                                  {STORE_CART && STORE_CART.length > 0
                                  ?(
                                      STORE_CART.length
                                  ):(
                                      0
                                  )
                                  }
                                </span>
                        </div>
                        
                         
                    </ul>
                )}
                
            </div>
                  
        </div>

          <div className={dropDown ? "--header-home-dropdown-menu" : "--header-home-dropdown-menu-hidden"}>
             <div className="--header-home-dropdown-menu-box">
              <Link className='--header-home-link-dropdown' to='/catalog'><li>{t('headers.adminHeader.catalog')}</li></Link>
              <Link className='--header-home-link-dropdown' to='/oferts'><li>{t('headers.adminHeader.oferts')}</li></Link>
              <Link className='--header-home-link-dropdown' to='/catalog'><li>{t('headers.adminHeader.ranking')}</li></Link>
             </div>
          </div>

        </>
    )
}



const mapStateToProps =  state => {
    return {
        STORE_CART : state.userReducers.cart,
        STORE_USER : state.userReducers
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchUserEffect: () => dispatch(fetchUser()),
    };
  };
  
  
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HeaderHome));
