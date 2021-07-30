import React, {useEffect, useState} from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import '../../assets/player/index.css';



const MusicPlayer = (props) =>{

   const [audioLists, setAudioLists] = useState([])
    
      useEffect(() => {
        setTimeout(() => {
            setAudioLists([
                {
                    name: props.name,
                    singer: props.singer,
                    cover:props.cover,
                    musicSrc:props.music,
                  },
                ])
        }, 2000)
      }, [setAudioLists, props])      

    

    return (
        <ReactJkMusicPlayer 
         mode='full'
         autoPlay={false}
         toggleMode={true}
         showMediaSession={true}
         theme='dark'
         audioLists={audioLists}
        />
    )
}

export default MusicPlayer
