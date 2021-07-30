import "./ItemCard.css";
import React from "react";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { fetchCart, deleteItemInCart } from '../../../stores/user/user.actions';
import swal from "sweetalert";
import sound from "../../../assets/audio/trash-click.mp3";
import { withTranslation } from 'react-i18next';
import { serverUrl } from '../../../auxiliar/variables';

const ItemCard = ({deleteItemInCartEffect, t, cartForItemCard,user_store, id, img, name, autor, price, ofert }) => {
  const audio = new Audio(sound);
        audio.volume=1;  
        console.log("user_store",ofert)
  

  const handleDelete= (id) => {
    swal({
      title: t("page.cart.alerts.emptyItem.title"),
      text: t("page.cart.alerts.emptyItem.text"),
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(t("page.cart.alerts.emptyItem.cartEmpty"), {
          icon: "success",
          timer: 2000
        });
        audio.play();
        var userStore = user_store.user && user_store.user.data && user_store.user.data.user ? user_store.user.data.user : null ;
        var user = {
          userState: userStore  ? true : false,
          id: userStore && userStore.id ? userStore.id : 0,
          orderId: user_store.cartDetaills.id ? user_store.cartDetaills.id : 0
        }
        
        for (let i = 0; i < cartForItemCard.length; i++) {
          console.log(cartForItemCard[i])
          if(cartForItemCard[i].productId === id){
            let idOrder = cartForItemCard[i].id
            deleteItemInCartEffect(idOrder, user, id);
              };
            };
        }else{
          swal(t("page.cart.alerts.emptyItem.cartSafe"),{ timer: 2000 });
         };
      });
  }
    return (
        <div className="--ItemCard">
            <div className="--ItemCard-left">
                <img alt="albumImg" src={`${serverUrl}/images/${img}`} />
                <div className="--ItemCard-data">
                    <Link to={`/product/${id}`}><h2>{name}</h2></Link>
                    <p>{autor}</p>
                </div>
            </div>
            <div
             className="--ItemCard-right">
               {ofert.length > 0 ? (
                 <span className="--ItemCard-right-price">${price - parseInt(ofert[0].discount)}</span>
               ):(
                <span className="--ItemCard-right-price">${price}</span>
               )}
                <span  onClick={()=>handleDelete(id, false)}>
                  <i class="fas fa-trash-alt --ItemCard-deletItem"></i>
                </span>
            </div>
        </div>
    )
};
const mapStateToProps =  state => {
    return {
      STORE_PRODUCT : state.productsReducers
    }
  }
const mapDispatchToProps = dispatch =>{
    return {
        fetchCartEffect: (user) => dispatch(fetchCart(user)),
        deleteItemInCartEffect: (productId, user, id) => dispatch(deleteItemInCart(productId, user, id))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ItemCard));