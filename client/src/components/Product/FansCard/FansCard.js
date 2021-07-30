import React from "react";
import { Link } from "react-router-dom";
import "./FansCard.css";
import imgProfile from "../../../assets/images/profile-image.jpg";
import moment from "moment";
import swal from 'sweetalert';
import axios from 'axios';
import {serverUrl} from '../../../auxiliar/variables';
const FansCard = ({username , idAuthor, user,  date}) => {
    console.log("username",username)
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
                      idTo: idAuthor,
                      idFrom: user.id,
                      message: message,
                      userFrom:username
                    }
                  };
                  
                return await axios.request(options).then(()=>{
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
        <div className="--FansCard">
            <div className="--FansCard-image">
                <img alt="userimage" src={imgProfile}/>
            </div>
            <div className="--FansCard-content">
              {user && user.id === idAuthor ?(
              <Link to={`/profile`}>
              <p className="--FansCard-content-username">{username}</p>
              </Link>
              ):(
                <Link to={`/publicProfile/${idAuthor}`}>
                <p className="--FansCard-content-username">{username}</p>
                </Link>
              )}
                
                <span className="--FansCard-content-date">{moment(date).fromNow()}</span>                
            </div>
            <div className="--FansCard-content">
            {user && user.id
            ?(
                <span 
                onClick={()=> handleLike()}
                className="material-icons --FansCard-content-reply-icon"> reply </span>
                  
            ):(
                <span></span>
            )

            }
            </div>
        </div>
    )
}

export default FansCard;