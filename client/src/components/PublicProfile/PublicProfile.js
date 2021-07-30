import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserById} from '../../stores/user/user.actions';
import {serverUrl} from '../../auxiliar/variables';
import './publicProfile.scss';
import BoxMessage from './BoxMessage';
import HistoryMessages from './Historymessages';
import swal from 'sweetalert';
import { useParams } from "react-router-dom"


const PublicProfile = () => {

  const {idUser} = useParams();
  
  const userFrom = useSelector(state => state.userReducers.user)
  const dispatch =  useDispatch();
  
 
  useEffect(() => {
     dispatch(getUserById(idUser))
 }, [dispatch, idUser])
 
 const user = useSelector(state => state.userReducers.userPublic)
 
 const handleLike =  ()=>{

    swal("Login for send message!");
    
}


 return (
    <div className="userMain">
        <div className="userHead">
        <div className="userName"><h1>{user.name}</h1></div> 
        <div className="imgProfileContainer"> 
            <img width="150px" height="140px" alt="profileImage" className="profileImage" src={`${serverUrl}/images/${user.image}`}/>
        </div>
        </div>
        
        { !user
                ? ( <div>
                CARGANDO...
            </div>
        ) : (
            user.id && userFrom && userFrom.length!== 0 ?(
        <div>
            <div className="userMail">
            <BoxMessage username={user.name} idFrom={userFrom.data.user.id} idTo={idUser} userNameFrom={userFrom.data.user.name} />
        </div>
        <div>
            <HistoryMessages usernameFrom={userFrom.data.user.name} idFrom={userFrom.data.user.id} idTo={idUser} username={user.name}/>
        </div>
        </div>
        ):(
            <div className="userHead">
                <div className="userMail">
                <span 
                onClick={()=> handleLike()}
                className="material-icons mail">
                mail_outline
                </span>
            </div>
            <div>
            </div>
            </div>
            
        )
        )}
        <div>
            
        </div>
    </div>
)

}

export default PublicProfile;