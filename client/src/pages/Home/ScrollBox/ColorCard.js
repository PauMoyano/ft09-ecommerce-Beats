import React from 'react';
import './colorCard.css';
import {useHistory} from "react-router-dom";
import {serverUrl} from '../../../auxiliar/variables'
import Vinilo from '../../../assets/audio/Vinilo.mp3'

function ColorCard({ product }) {

  const audio = new Audio(Vinilo);
  audio.volume = 1;

  const history = useHistory()
  function handleColorCopy() {
    if(product && product.id){
      history.push(`/product/${product.id}`)
    }
  }


  return (
    <>
    {product && product.artist
      ?(
        <div onMouseOver={()=>{
          audio.play()
          setTimeout(()=>{ 
            return audio.pause()
            },5000)}
          }
          onMouseOut={()=>{
          audio.pause()
          audio.currentTime=0}} 
          className="color-card" 
          style={{ background:`url(${serverUrl}/images/${product.image})`, 
          backgroundRepeat:"no-repeat", 
          backgroundSize:"100% 100%"}}>

          <div className="color-card__code" onClick={handleColorCopy}>
            {product.name.slice(0,16).toLowerCase()}
          </div>
       </div>
      ):(
        <div className="color-card" style={{ backgroundColor:"white"  }}>
      <button className="color-card__code" onClick={handleColorCopy}>
      
      </button>
    </div>
      )
    }
      </>
  );

}



export default ColorCard;