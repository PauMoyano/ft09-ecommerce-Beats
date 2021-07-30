import React, { useState } from "react";

//Internationalization
import { withTranslation } from "react-i18next";
import OrderCard from "../OrderCard/OrderCard";
import moment from "moment";
import "./TabUser.css";
import "./likes.css";
import { serverUrl } from "../../../auxiliar/variables";
import { useHistory } from "react-router-dom";
const TabUser = ({ t, orders, favorites }) => {
    const [purchases, setPurchases] = useState(true);
    const [comments, setComments] = useState(false);
    const [likes, setLikes] = useState(false);
    // console.log(favorites);
    // eslint-disable-next-line
    const [userComents] = useState([]);
    const history = useHistory();

    const handleClick = (param) => {
        switch (param) {
            case "purchases":
                return () => {
                    setComments(false);
                    setPurchases(true);
                    setLikes(false);
                };
            case "comments":
                return () => {
                    setComments(true);
                    setPurchases(false);
                    setLikes(false);
                };
            case "likes":
                return () => {
                    setComments(false);
                    setPurchases(false);
                    setLikes(true);
                };
            default:
                break;
        }
    };

    return (
        <div className="--TabUser">
            <div className="--TabUser-tab">
                <div
                    className={
                        purchases ? "--TabUser-tab-active" : "--TabUser-tab-inactive"
                    }
                    onClick={handleClick(purchases ? "" : "purchases")}
                >
                    <p>{t("page.profile.tabUser.purchases")}</p>
                </div>
                <div
                    className={
                        comments ? "--TabUser-tab-active" : "--TabUser-tab-inactive"
                    }
                    onClick={handleClick(comments ? "" : "comments")}
                >
                    <p>{t("page.profile.tabUser.coments")}</p>
                </div>
                <div
                    className={likes ? "--TabUser-tab-active" : "--TabUser-tab-inactive"}
                    onClick={handleClick(likes ? "" : "likes")}
                >
                    <p>Likes</p>
                </div>
            </div>
            <div className="--TabUser-content">
                <div
                    className={
                        purchases
                            ? "--TabUser-content-active"
                            : "--TabUser-content-inactive"
                    }
                >
                    {orders && orders.length >= 1 ? (
                        orders.map((order, index) => {
                            return (
                                <OrderCard
                                    key={index}
                                    id={order.id}
                                    status={order.orderStatus}
                                    orderLines={order.orderLines}
                                    createdAt={order.createdAt}
                                />
                            );
                        })
                    ) : (
                        <p>NO PRODUCTS IN DB</p>
                    )}
                </div>
                <div
                    className={
                        likes ? "--TabUser-content-active" : "--TabUser-content-inactive"
                    }
                >
                    <div className="likeContainerMain">
                        {favorites && favorites.length > 0 ? (
                            favorites.map((lik) => {

                                return (
                                    <>
                                {lik.products[0]
                                        ?(
                                    <div className="likeContainer"
                                        onClick={() =>
                                            history.push("/product/" + lik.products[0].id)
                                        }
                                    >
                                        <div className="likeContainerImg">
                                            
                                            <img
                                                alt="albumimage"
                                                src={`${serverUrl}/images/${lik.products[0].image}`}
                                            />
                                        </div>
                                        <div className="likeContainerDetails">
                                            <div

                                                className="likeName"
                                            >
                                                {lik.products[0].name}
                                            </div>
                                            <div className="likeArtist">{lik.products[0].artist}</div>
                                            <div className="likeAuthor"> {lik.author}</div>
                                            <div className="likeDate">
                                                {" "}
                                                    liked {moment(lik.createdAt).fromNow()}
                                            </div>
                                        </div>
                                    </div>
                                        ):(
                                            <div></div>
                                        )
                                        }
                                    </>
                                )
                                    
                            })
                        ) : (
                            <p>No comments found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withTranslation()(TabUser);
