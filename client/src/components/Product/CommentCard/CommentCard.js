import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import imgProfile from "./profile-image.png"
import moment from "moment";
import { useSelector} from 'react-redux';

const CommentCard = ({username , date , comment, userId}) => {
    const logueado = useSelector(state => state.userReducers)
    
    return (
        <div className="--CommentCard">
            <div className="--CommentCard-imageDiv">
                <img alt="profile" src={imgProfile}/>
            </div>
            <div className="--CommentCard-contentDiv">
                <div className="--CommentCard-contentDiv-commentInfo">
                    {logueado.user.data  && logueado.user.data.user.id === userId ?(
                         <Link to={`/profile`}>
                         <span className="--CommentCard-contentDiv-commentInfo-userName">{username}</span>
                     </Link>
                    ):(
                        <Link to={`/publicProfile/${userId}`}>
                        <span className="--CommentCard-contentDiv-commentInfo-userName">{username}</span>
                        </Link>
                    )}
                
                    <span>  ·  </span>
                    <span className="--CommentCard-contentDiv-commentInfo-date">{moment(date).fromNow()}</span>
                </div>
                <div className="--CommentCard-contentDiv-comment">
                    <span>{comment}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentCard;