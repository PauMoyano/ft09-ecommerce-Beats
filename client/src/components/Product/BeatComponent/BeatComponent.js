import React, { useState } from "react";
import { connect } from "react-redux";
import { addItemToCart } from "../../../stores/user/user.actions";
import { fetchAddLikeToProduct } from "../../../stores/products/products.actions";
import { show } from "js-snackbar";
import MusicPlayer from "../../../components/musicPlayer/MusicPlayer";
import "js-snackbar/snackbar.css";
import "./beatComponent.css";
import spinner from "../../../assets/images/Spin-1s-200px.svg";
import swal from "sweetalert";
import { withTranslation } from "react-i18next";
import {serverUrl} from '../../../auxiliar/variables';
const BeatComponent = ({
  t,
  addItemToCartEffect,
  fetchAddLikeToProductEffect,
  product,
  STORE_USER,
  LIKES,
  productLoading,
}) => {
  //USER IDENTIFICATION FOR REDUCER #############################################
  let userStore =
    STORE_USER.user && STORE_USER.user.data && STORE_USER.user.data.user
      ? STORE_USER.user.data.user
      : null;
  let user = {
    userStatus: userStore ? true : false,
    id: userStore && userStore.id ? userStore.id : 0,
    orderId: STORE_USER.cartDetaills.id ? STORE_USER.cartDetaills.id : 0,
  };
  //#############################################################################

  const handleAddToCart = (product) => {
    show({ text: "PRODUCT ADDED!", pos: "relative", duration: 2000 });
    return addItemToCartEffect(user, product);
  };


  const [newLikeState, setNewLikeState] = useState(false);

  if (userStore) {
    if (product && product.likes && product.likes.length > 0) {
      for (var i = 0; i < product.likes.length; i++) {
        if (userStore.id === product.likes[i].idUser) {
        //  console.log("YALEDIOLIKE");
          if (!newLikeState) {
            setNewLikeState(true);
          }
        }
      }
    }
  }

  const handleLike = async (e, idProduct) => {
    e.preventDefault();
    let author = userStore.name;
    let idUser = userStore.id;
    let aux = false;
    if (product && product.likes && product.likes.length > 0) {
      for (var i = 0; i < product.likes.length; i++) {
        if (product.likes[i].idUser === idUser) {
          return (aux = true);
        }
      }
    }
    if (userStore && userStore.name && !aux) {
      fetchAddLikeToProductEffect(idProduct, true, author, idUser);
    }
  };

  return (
    <>
      {productLoading ? (
        <div className="spinnerLoading">
          <img src={spinner} alt="loadingSpin" />
        </div>
      ) : (
        <div className="beatComponent--main">
          {product && product.name ? (
            <div className="beatComponent--main-row">
              <div className="beatComponent--main-imagen-col">
                <img
                  alt="album"
                  src={`${serverUrl}/images/${product.image}`}
                ></img>
              </div>
              <div className="beatComponent--main-beatInfo-col">
                <h1>{product.name} </h1>
                <div className="beatComponent--main-beatInfo-col-author">
                  {t("components.beatComponent.artist")}
                  {product.artist}
                </div>
                <div className="beatComponent--main-beatActions-col">
                  <div className="beatComponent--main-beatActions-col-div">
                    <span className="material-icons icons"> play_arrow </span>
                    {product.reproductions}
                  </div>
                  <div className="beatComponent--main-beatActions-col-div">
                    <span className="icon-bpm icons">BPM</span>
                    {product.bpm}
                  </div>
                  <div className="beatComponent--main-beatActions-col-div">
                    <span className="material-icons icons">music_note</span>
                    {product.scale}
                  </div>
                  <div className="beatComponent--main-beatActions-col-div">
                    <span className="material-icons icons">event</span>
                    {product.date}
                  </div>
                </div>
                <div className="beatComponent--main-beatActions-col">
                  <div className="beatComponent--main-beatActions-col-button">
                    <div>
                      <button className="beatComponent--main-beatActions-col-btn">
                        <div
                          onClick={() => {
                            return handleAddToCart(product);
                          }}
                          className="beatComponent--main-beatActions-col-btn-row"
                        >
                          <div>
                            <span className="material-icons cart-icons">
                              add_shopping_cart
                            </span>
                          </div>
                          <div className="button-cart2">
                            {t("components.beatComponent.buttonCart")}
                            {product.price}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <>
                    {newLikeState ? (
                      <div className="product-likes2">
                        {userStore && userStore.id ? (
                          <>
                            <span className="likes-numbers">{LIKES}</span>
                            <span
                              className="material-icons finger-up2"
                              onClick={(e) => handleLike(e, product.id)}
                            >
                              favorite
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="likes-numbers">{LIKES}</span>
                            <span
                              className="material-icons finger-up-not-user"
                              onClick={(e) => swal("Login to Like")}
                            >
                              favorite_border
                            </span>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="product-likes2">
                        {userStore && userStore.id ? (
                          <>
                            <span className="likes-numbers">{LIKES}</span>
                            <span
                              className="material-icons finger-up"
                              onClick={(e) => handleLike(e, product.id)}
                            >
                              favorite_border
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="likes-numbers">{LIKES}</span>
                            <span
                              className="material-icons finger-up-not-user"
                              onClick={(e) => swal("Login to Like")}
                            >
                              favorite_border
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </>
                </div>
                <div className="beatComponent--main-beatActions-col column">
                  {product.categories && product.categories.length > 0 ? (
                    product.categories.map((categorie, index) => {
                      return (
                        <span key={index} className="beatComponent--main-beatActions-col-cat">
                          {categorie.name}
                        </span>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
                <div className="beatComponent--main-beatActions-col column">
                  <p>{product.description}</p>
                </div>
                <div className="spec">
                  <MusicPlayer
                    name={product.name}
                    singer={product.artist}
                    cover={`${serverUrl}/images/${product.image}`}
                    music={`${serverUrl}/images/${product.audio}`}
                  />
                </div>
              </div>
              <div className="beatComponent--main-beatTags-col"></div>
            </div>
          ) : (
            <p>{t("components.beatComponent.p")}</p>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    STORE_PRODUCT: state.productsReducers,
    STORE_USER: state.userReducers,
    LIKES: state.productsReducers.products_likes,
    productLoading: state.productsReducers.Loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCartEffect: (user, product) =>
      dispatch(addItemToCart(user, product)),
    fetchAddLikeToProductEffect: (productId, like, author, idAuthor) =>
      dispatch(fetchAddLikeToProduct(productId, like, author, idAuthor)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(BeatComponent));
