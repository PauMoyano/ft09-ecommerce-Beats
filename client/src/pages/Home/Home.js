import './Home.css'
import React  from 'react';
import { connect } from 'react-redux';
import MiddleSearchBar from './MiddleSearchBar/MiddleSearchBar.js';
import Container from "./Lists/Container";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import BgVideo from "../../components/Home/BgVideo/BgVideo";
import deadmau from "../../assets/audio/feli-music.mp3";
import imagemau from "../../assets/images/feli-music.png";

const Home = ({STORE_PRODUCTS}) =>{


    return (
          <>
            {STORE_PRODUCTS.product
              ?(
               <div className='BackgroundHome'>
                <BgVideo></BgVideo>
                <MiddleSearchBar/>
                <Container/> 
                <MusicPlayer  name="El azar" singer="Felipe Traina" cover={imagemau} music={deadmau}/>
               </div> 
              ):(
                <div className='BackgroundHome'>
                <MiddleSearchBar/>
                <Container/>
               </div> 
              )}
         </>
    )
}

const mapStateToProps =  state => {
    return {
      STORE_PRODUCTS : state.productsReducers
    }
}

  
export default connect(mapStateToProps)(Home);
