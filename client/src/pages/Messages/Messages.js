import React, {useState} from 'react';
import './messages.scss';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import spinner from '../../assets/images/Spin-1s-200px.svg';
import moment from 'moment';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {fetchUserInBox} from '../../stores/user/user.actions';
import swal from 'sweetalert';
import {serverUrl} from '../../auxiliar/variables';

const Messages = ({t, USER_INBOX, fetchUserInBoxEffect})=>{

    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState(false)

    const handleModal = ()=>{
        return modal ? setModal(false) : setModal(true)
    }
    
    const handleDelete = async (messageId, userId)=>{
        setDeleteMessage(true)
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this message?",
            icon: "warning",
            dangerMode: true,
          })
          .then(async ()=>{
            try {
                const options = {
                    method: 'DELETE',
                    url: `${serverUrl}/messages/${messageId}`,
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  };
                  
                  axios.request(options).then(function (response) {
                   return fetchUserInBoxEffect(userId)
                  }).then(()=>{
                   return setDeleteMessage(false)
                  }).catch(function (error) {
                    console.error(error);
                  });
            } catch (error) {
                
            }
          })
          .then(willDelete => {
            if (willDelete) {
              swal("Deleted!", "Your message file has been deleted!", "success");
            }
          });

    }

    const handleSend = async (idTo, idFrom)=>{

        try {
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
                  userFrom:USER_INBOX.user.data.user.name
                }
              };
              
            return await axios.request(options).then(function (response) {
                setModal(false)
              }).catch(function (error) {
                console.error(error);
              });
        } catch (error) {
            
        }
    }
   
    console.log("USER_INBOX",USER_INBOX)
    return (
    
        <div className="--messages-main">
            <div className="--message-main-title">
                <div>
                    <h1> Messages Inbox </h1>
                </div>
                <div>
                <span className="--messages-item-col-text-reply">
                     <span class="material-icons"> arrow_back</span> 
                     <Link className="--messages-item-go-back" to="/profile">
                        Go to Profile
                     </Link>
                </span>
                </div>
           </div>
           <div>
           {USER_INBOX.userInBoxLoading && deleteMessage
            ?(
                <div className="--messages-loading">
                    <img src={spinner} alt="loading..."></img>
                </div>
            ):(
                USER_INBOX.userInBox.map((message, index)=>{
                
                   console.log("message",message)
                    return (
                        <div key={index} className="--messages-item">
                            <div className="--message-item-delete">
                                <span 
                                onClick={()=>handleDelete(message.id, message.to)}
                                class="material-icons --message-item-delete-icon">
                                delete
                                </span>
                            </div>
                            <div className="--messages-item-col">
                                <div className="--messages-item-col-main">
                                    <span className="--messages-item-col-span">To:</span>
                                    <span className="--messages-item-col-text"> {USER_INBOX.user.data.user.name}</span>
                                </div>
                                <div className="--messages-item-col-main">
                                    <span className="--messages-item-col-span">Date:</span>
                                    <span className="--messages-item-col-text">
                                         {moment(message.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                            <div className="--messages-item-col">

                                <div className="--messages-item-col-main">
                                    <span className="--messages-item-col-span">From:</span>
                                    <span className="--messages-item-col-text"> {message.userFrom}</span>
                                    <span 
                                    onClick={handleModal}
                                    className="--messages-item-col-text-reply">
                                        <span>Reply</span>
                                        <span class="material-icons">reply</span> 
                                    </span>
                                <div className={ modal ? "super-modal" : "super-modal-hidden"} >
                                    <div className="super-modal-col-reply">
                                    <div className="--messages-item-col-main">
                                        <span className="--messages-item-col-span">Reply to:</span>
                                        <span className="--messages-item-col-text"> {message.from}</span>                
                                    </div>
                                </div >
                                <div className="super-modal-col">
                                    <textarea
                                        onChange={(e)=> setMessage(e.target.value)}
                                        className="super-modal-textarea"
                                        name="textarea"
                                        rows="5"
                                        cols="50"
                                        maxLength="240" 
                                        placeholder="Write your reply"
                                    >
                                    
                                    </textarea>    
                                </div>
                                <div className="super-modal-col-buttons">

                                    <button 
                                    onClick={()=>handleSend(message.from, message.to)}
                                    className="super-modal-col-button-send"> Send </button>
                                    <button
                                    className="super-modal-col-button-cancel"
                                    onClick={handleModal}
                                    > Cancel </button>
                                </div>
                            </div>
                                </div>
                            </div >
                            <div className="--messages-item-col">
                                <div className="--messages-item-col-main-message">
                                    <span className="--messages-item-col-span">Message:</span>
                                    <span className="--messages-item-col-text"> {message.data}</span>
                                </div>
                            </div>
                            
                        </div>
                    )
                })
            )
        }
        </div>

    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        USER_INBOX: state.userReducers
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserInBoxEffect: (idUser) => dispatch(fetchUserInBox(idUser)),
    };
  };

  
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Messages));
