import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";

import { connect } from 'react-redux';
import { fetchOneProduct, postComment, getProductsByCategories } from '../../stores/products/products.actions';
import { fetchUser } from '../../stores/user/user.actions';
//components
import BeatComponent from '../../components/Product/BeatComponent/BeatComponent';
import BeatCommentsInputComponent from '../../components/Product/BeatCommentsInputComponent/BeatCommentsInputComponent';
import TabPanel from '../../components/Product/TabPanel/TabPanel';
import PreLoad from "./PreLoad"
import "./product.css";

const Product = ({ relatedArtist, STORE_USER, ProductsByCategories, postCommentEffect, fetchUserEffect, STORE_PRODUCT }) => {

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
  window.scrollTo({
    top: 0,
    left: 0,
    behavir: 'smooth'
  });

  const { productId } = useParams();
  useEffect(() => {
    fetchUserEffect()

    let categories = STORE_PRODUCT.product.categories?.map(c => c.name)

    ProductsByCategories(categories)

  }, [fetchUserEffect, productId, ProductsByCategories, STORE_PRODUCT.product]);

  return (
    <>
      {STORE_PRODUCT.productLoading
        ? (
          <p>Cargando</p>
        )
        : (
          <main className="product--main">
            <PreLoad />
            <div className="product--main-col">
              <BeatComponent product={STORE_PRODUCT.product} />
            </div>
            <div className="product--main-col">
             <BeatCommentsInputComponent action={postCommentEffect} product={STORE_PRODUCT.product.id}  STORE_USER={STORE_USER} />
            </div>

              <div className="product--main-col">
                <TabPanel related={relatedArtist} user={user} product={STORE_PRODUCT.product} />
              </div>
            <div className="divider"></div>
          </main>

        )
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    STORE_PRODUCT: state.productsReducers,
    relatedArtist: state.productsReducers.productCategories,
    STORE_USER: state.userReducers
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchOneProductEffect: (productId) => dispatch(fetchOneProduct(productId)),
    postCommentEffect: (productId, comment) => dispatch(postComment(productId, comment)),
    fetchUserEffect: () => dispatch(fetchUser()),
    ProductsByCategories: (categories) => dispatch(getProductsByCategories(categories)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);
