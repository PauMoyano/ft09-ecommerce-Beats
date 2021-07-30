import './Profile.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchUser, getOrdersByUser,getLikesByUser } from '../../../stores/user/user.actions';
import axios from 'axios';
import ProfileCard from '../../../components/Profile/ProfileCard/ProfileCard';
import TabUser from '../../../components/Profile/TabUser/TabUser';
import { withTranslation } from 'react-i18next';
import logoIcon from "../../../assets/images/icon-logo.png";
import {serverUrl} from '../../../auxiliar/variables';
const Profile = ({ t, getLikesByUserFx,fetchUserEffect, STORE_USER, getOrdersByUserEf }) => {

  const history = useHistory();


  useEffect(() => {
    let userStore = STORE_USER.user && STORE_USER.user.data && STORE_USER.user.data.user ? STORE_USER.user.data.user : null;
    if (userStore && userStore.id) {
      let userId = userStore.id
      console.log(userId)
      getOrdersByUserEf(userId)
      getLikesByUserFx(userId)
    }
    fetchUserEffect();// eslint-disable-next-line
  }, [fetchUserEffect, getOrdersByUserEf,getLikesByUserFx]);


  const handleClickLogin = (e) => {
    e.preventDefault()
    // localStorage.clear()
    history.push("/login")
  };
  const handleClickRegister = (e) => {
    e.preventDefault()
    // localStorage.clear()
    history.push("/register")
  };

  function generateNewToken() {
    const options = {
      method: 'POST',
      url: `${serverUrl}/users/token/`,
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem("refreshToken")
      },
      data: {
        useremail: localStorage.getItem("email"),
        refreshToken: localStorage.getItem("refreshToken")
      }
    };

    axios.request(options, {
    }).then(newTokens => {
      localStorage.setItem("token", newTokens.data.newToken)
      localStorage.setItem("refreshToken", newTokens.data.newRefreshToken)
      history.push("/")
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <>
      {STORE_USER.userLoading
        ? (
          <div className="loadding-div">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="--profile-all">
            {STORE_USER.user && STORE_USER.user.data
              ? (
                <>
                  <div className="--Profile">
                    <ProfileCard name={STORE_USER.user.data.user.name} image={STORE_USER.user.data.user.image} email={STORE_USER.user.data.user.email} />
                    <TabUser favorites={STORE_USER.userLikes} orders={STORE_USER.orders} />
                  </div>
                </>
              ) : (
                <>
                  {generateNewToken()}
                    <div className="--profile-not-user">
                      <div className="--profile-margin">
                         <div className="--profile-not-user-container">
                          <div className="--profile-logo">
                            <Link className="--profile-logo-link" to='/'>
                                <img width="60px" height="50px" src={logoIcon} alt="beatstore"></img>
                            </Link>
                          </div>  
                          <h2>{t('page.profile.title')}</h2>
                          <h3>{t('page.profile.subtitle')}</h3>
                          <button onClick={handleClickRegister}>{t('page.profile.buttonSecond')}</button>
                          <p>or</p>
                          <button onClick={handleClickLogin}>{t('page.profile.button')}</button>
                      </div>
                      </div>
                     
                  </div>
                </>
              )
            }

          </div>
        )
      }
    </>

  )
}

const mapStateToProps = state => {
  return {
    STORE_USER: state.userReducers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserEffect: () => dispatch(fetchUser()),
    getOrdersByUserEf: (userId) => dispatch(getOrdersByUser(userId)),
    getLikesByUserFx:(userId) => dispatch(getLikesByUser(userId))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Profile));