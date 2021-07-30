import React from "react";
import Logo from '../../../assets/images/icon-logo.png'
import { Link } from 'react-router-dom'
import '../HeaderHome/header-home.scss';


const HeaderPrint = () =>{

    
    return (
        <div className="--header-home-main">
            <div className="--header-print-logo">
            <Link  to='/'><img src={Logo} alt="BeatShop"></img></Link>
            <Link className='--header-h1-link' to='/'><h1>BeatStore</h1></Link>   
            </div>
        </div>
            
    )
}

export default HeaderPrint;
