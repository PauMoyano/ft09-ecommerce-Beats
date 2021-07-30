import React from 'react';
import "./rankingitem.scss";
import Spinner from "../../../assets/images/Spin-1s-200px.svg";
import {serverUrl} from '../../../auxiliar/variables';
import {useHistory} from "react-router-dom"

const RankingItem = ({ position, id, name, artist, description, reproductions, image  }) => {
  const history = useHistory();

  const handleClick = (id)=>{
    return history.push(`/product/${id}`)
  }

  return (
    <>
      {false
        ? (
          <div className="ranking-item-loading">
              <img src={Spinner} alt="Loading..."></img>
          </div>
        )
        : (
          <article className="--ranking-item-article" onClick={()=>handleClick(id)}>
              <div className="--ranking-item-article-position">
                  {position + 1 }
              </div>
              <div className="--ranking-item-article-img-div">
                  <img className="--ranking-item-article-img"
                    src={`${serverUrl}/images/${image}`}
                    alt="Album...">
                  </img>
              </div>
              <div className="--ranking-item-article-details">
                <div>
                    <h3>
                        {name}
                    </h3>
                    <span className="--ranking-item-article-details-artist">
                         {artist}
                    </span>
                </div>
                <div >
                    <span className="--ranking-item-article-details-description">
                         {description}
                    </span>
                </div>
              </div>
              <div className="--ranking-item-article-reproductions">
                  <p>
                    {reproductions}
                  </p>
              </div>
          </article>

        )
      }
    </>
  )
}

export default RankingItem;