import React from 'react';
import "./Footer.scss";

//import FacebookIcon from "../../assets/images/social-icons/facebook.png";
import TwitterIcon from "../../assets/images/social-icons/gorjeo.png";
//import YoutubeIcon from "../../assets/images/social-icons/youtube.png";
//import TikTokIcon from "../../assets/images/social-icons/tik-tok.png";
//import InstagramIcon from "../../assets/images/social-icons/instagram.png";
import LinkedinIcon from "../../assets/images/social-icons/linkedin.png";
//import TwitchIcon from "../../assets/images/social-icons/twitch.png";
import WhatsappIcon from "../../assets/images/social-icons/whatsapp.png";

//Nosotros
import MatiIcon from "../../assets/images/nosotros/mati.png";
import TinchoIcon from "../../assets/images/nosotros/tincho.png";
import LeoIcon from "../../assets/images/nosotros/leo.jpeg";
import PauIcon from "../../assets/images/nosotros/pau.png";
import LucasIcon from "../../assets/images/nosotros/lucas.png";
import FeliIcon from "../../assets/images/nosotros/feli.jpeg";

//waves
import Waves from "../../assets/images/nosotros/wave.svg";

//Henry Logo
import Henry from "../../assets/images/henry.png";

const Footer = () =>{


    return (
      <>
        <div className="--footer-main">
          <div className="--footer-main-col --footer-main-col-bg">
              <h1 className="--footer-title">By</h1>
          </div>
          <div className="--footer-main-col">
            <div className="--footer-main-col-3">
                <div className="--footer-main-col-3-alumno">
                    <div className="alumno-img">
                        <img
                        className="filter-feli"
                        src={FeliIcon} alt="Feli no sabe"></img>
                    </div>
                    <div className="alumno-name">
                        <p>Felipe Traina</p>
                      </div>
                      <div className="alumno-social">
                        {/* <img src={FacebookIcon} alt="facebook"></img>
                        <img src={YoutubeIcon} alt="youtube"></img>
                        <img src={TwitchIcon} alt="twitch"></img> */}
                        <img src={TwitterIcon} alt="twitter"></img>
                        {/* <img src={TikTokIcon} alt="tiktok"></img> */}
                        <img src={LinkedinIcon} alt="linkedin"></img>
                        {/* <img src={InstagramIcon} alt="instagram"></img> */}
                        <img src={WhatsappIcon} alt="whatsapp"></img>
                      </div>
                </div>
                <div className="--footer-main-col-3-alumno">
                    <div className="alumno-img">
                        <img 
                        className="filter-mati"
                        src={MatiIcon} alt="Matis Flores Sabe Ingles"></img>
                    </div>
                    <div className="alumno-name">
                        <p>Matias Flores</p>
                      </div>
                      <div className="alumno-social">
                        {/* <img src={FacebookIcon} alt="facebook"></img> */}
                        {/* <img src={YoutubeIcon} alt="youtube"></img>
                        <img src={TwitchIcon} alt="twitch"></img> */}
                        <img src={TwitterIcon} alt="twitter"></img>
                        {/* <img src={TikTokIcon} alt="tiktok"></img> */}
                        <img src={LinkedinIcon} alt="linkedin"></img>
                        {/* <img src={InstagramIcon} alt="instagram"></img> */}
                        <img src={WhatsappIcon} alt="whatsapp"></img>
                      </div>
                </div>
                <div className="--footer-main-col-3-alumno">
                    <div className="alumno-img">
                        <img 
                        className="filter-leo"
                        src={LeoIcon} alt="Leo"></img>
                    </div>
                    <div className="alumno-name">
                        <p>Leonel Tomasini</p>
                      </div>
                      <div className="alumno-social">
                        {/* <img src={FacebookIcon} alt="facebook"></img> */}
                        {/* <img src={YoutubeIcon} alt="youtube"></img> */}
                        {/* <img src={TwitchIcon} alt="twitch"></img> */}
                        <img src={TwitterIcon} alt="twitter"></img>
                        {/* <img src={TikTokIcon} alt="tiktok"></img> */}
                        <img src={LinkedinIcon} alt="linkedin"></img>
                        {/* <img src={InstagramIcon} alt="instagram"></img> */}
                        <img src={WhatsappIcon} alt="whatsapp"></img>
                      </div>
                </div>
                <div className="--footer-main-col-3-alumno">
                    <div className="alumno-img">
                        <img
                        className="filter-tincho"
                        src={TinchoIcon} alt="Tincho"></img>
                    </div>
                    <div className="alumno-name">
                        <p>Martin Cavanagh</p>
                      </div>
                      <div className="alumno-social">
                        {/* <img src={FacebookIcon} alt="facebook"></img> */}
                        {/* <img src={YoutubeIcon} alt="youtube"></img> */}
                        {/* <img src={TwitchIcon} alt="twitch"></img> */}
                        <img src={TwitterIcon} alt="twitter"></img>
                        {/* <img src={TikTokIcon} alt="tiktok"></img> */}
                        <img src={LinkedinIcon} alt="linkedin"></img>
                        {/* <img src={InstagramIcon} alt="instagram"></img> */}
                        <img src={WhatsappIcon} alt="whatsapp"></img>
                      </div>
                </div>
                <div className="--footer-main-col-3-alumno">
                    <div className="alumno-img">
                        <img 
                        className="filter-pau"
                        src={PauIcon} alt="Paula"></img>
                    </div>
                    <div className="alumno-name">
                        <p>Paula Moyano</p>
                    </div>
                    <div className="alumno-social">
                      {/* <img src={FacebookIcon} alt="facebook"></img>
                      <img src={YoutubeIcon} alt="youtube"></img>
                      <img src={TwitchIcon} alt="twitch"></img> */}
                      <img src={TwitterIcon} alt="twitter"></img>
                      {/* <img src={TikTokIcon} alt="tiktok"></img> */}
                      <img src={LinkedinIcon} alt="linkedin"></img>
                      {/* <img src={InstagramIcon} alt="instagram"></img> */}
                      <img src={WhatsappIcon} alt="whatsapp"></img>
                    </div>
                </div>
                <div className="--footer-main-col-3-alumno">
                    <div className="alumno-img">
                        <img
                        className="filter-lucas"
                        src={LucasIcon} alt="delye"></img>
                    </div>
                    <div className="alumno-name">
                        <p>Lucas del Yerro</p>
                      </div>
                      <div className="alumno-social">
                        {/* <img src={FacebookIcon} alt="facebook"></img>
                        <img src={YoutubeIcon} alt="youtube"></img>
                        <img src={TwitchIcon} alt="twitch"></img> */}
                        <img src={TwitterIcon} alt="twitter"></img>
                        {/* <img src={TikTokIcon} alt="tiktok"></img> */}
                        <img src={LinkedinIcon} alt="linkedin"></img>
                        {/* <img src={InstagramIcon} alt="instagram"></img> */}
                        <img src={WhatsappIcon} alt="whatsapp"></img>
                      </div>
                </div>
            </div>

          </div>

        </div>
        <div className="waves">
          <img width="100%" src={Waves} alt="waves"></img>
        </div>
        <div className="henry-footer">
         <div>
          <h6>Henry E-commers Proyect 06/04/2021</h6>
         </div>
         <div>
          <img width="150px" src={Henry} alt="waves"></img>
         </div>
        </div>
        </>
    )
}



export default Footer;
