import React from "react"
import "./ComentCard.css"

const ComentCard = () => {
    return (
        <div className="--ComentCard">
            <div className="--ComentCard-song">
                <span>name</span>
                <span>artist</span>
            </div>
            <div className="--ComentCard-coment">
                <span>coment</span>
                <span>date</span>
            </div>
        </div>
    )
}
// moment(date).fromNow()
export default ComentCard;