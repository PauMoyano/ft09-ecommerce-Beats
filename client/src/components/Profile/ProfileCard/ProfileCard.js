import "./ProfileCard.css";
import React, {useState} from "react";
import sound from "../../../assets/audio/system-shut-down.mp3";
import { withTranslation } from 'react-i18next';
import {Link} from 'react-router-dom';
import {serverUrl} from '../../../auxiliar/variables'
const ProfileCard = ({ t,name, email, image }) => {

const audio = new Audio(sound);
      audio.volume=0.1;

    const handleLogout = (e) => {
        e.preventDefault()
        audio.play()
        settrancit(true)
        localStorage.clear()
       setTimeout(()=>{
        return window.location.replace(`${serverUrl}/logout`)
       },1500)
    }
    const [trancit, settrancit] = useState(false)
    return (
        <div className={"--profileCard-user"}>
            <div className={trancit ? "trancition-active" : "trancition"}></div>
            <div className={trancit ? "--profileCard-user--hidden" : "--profileCard-user-img"}>
                <img alt="profileImage" src={`${serverUrl}/images/${image}`} />
            </div>
            <div className={trancit ? "--profileCard-user--hidden" : "--profileCard-user-info"}>
                <p className="--profileCard-user-info-name">{name}</p>
                <p className="--profileCard-user-info-name">{email}</p>
            </div>
            <div className={trancit ? "--profileCard-user--hidden" : "--profileCard-user-info"}>
                <span className="material-icons --profileCard-user-inbox-icon">  markunread_mailbox </span>
                <Link className="--profileCard-user-inbox" to="/profile/messages/">Inbox</Link>
            </div>
            <div className={trancit ? "--profileCard-user--hidden" : "--profileCard-user-butons"}>
                <button>
                    <Link 
                        className="--profileCard-user-button-edit" 
                        to="/profile/edit">{t("page.profile.profileCard.editButton")}
                    </Link>
                </button>
                <button onClick={handleLogout}>{t("page.profile.profileCard.logout")}</button>
            </div>
        </div>
    )
}

export default withTranslation()(ProfileCard);