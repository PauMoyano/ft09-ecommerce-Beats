import React from "react";
import "./RelatedTracks.css";
import { useHistory } from "react-router-dom";
import {serverUrl} from '../../../auxiliar/variables';
const RelatedTracks = ({ title, author, price, image, id }) => {
    const history = useHistory()
    return (
        <div className="--RelatedTracks-main">
            <div className="--RelatedTracks-main-row">
                <div className="--RelatedTracks-main-col-img">
                    <img width="100px" src={`${serverUrl}/images/` + image} alt="album"></img>
                </div>
                <div onClick={() => { history.push("/product/" + id) }} className="--RelatedTracks-main-col-text">
                    <h3>{title}</h3>
                    <p>{author}</p>
                </div>
            </div>
        </div>
    )
}

export default RelatedTracks;