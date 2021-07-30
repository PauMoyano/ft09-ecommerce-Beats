import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import "./boxMessage.css";
import swal from 'sweetalert';
import axios from 'axios';
import {serverUrl} from '../../auxiliar/variables';
import {getMessagesConversation} from '../../stores/user/user.actions';
const BoxMessage = ({username , idFrom, idTo,  userNameFrom}) => {
    
    const dispatch = useDispatch();
    const handleLike = ()=>{

        swal({
            text: `Reply to ${username}`,
            content: "input",
            button: {
              text: "Write Your Message!",
              closeModal: true,
            },
          })
          .then(async (message) => {
            if (!message)  return swal("Write Some Message!");
           
     
                const options = {
                    method: 'POST',
                    url: `${serverUrl}/messages/`,
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    data: {
                      idTo: idTo,
                      idFrom: idFrom,
                      message: message,
                      userFrom:userNameFrom
                    }
                  };
                  
                return await axios.request(options).then(()=>{
                    dispatch(getMessagesConversation(idFrom,idTo))
                    return swal("Mensaje Enviado!");
                   
                })

      
          })
          .catch(err => {
            if (err) {
              swal("Oh noes!", "Error", "error");
            } else {
              swal.stopLoading();
              swal.close();
            }
          });
    }

    return (
        
            
            <div className="mailing">
                <span 
                onClick={()=> handleLike()}
                className="material-icons mail">
                mail_outline
                </span>
            </div>
        
    )
}

export default BoxMessage;