import "./Cart.css";
import React, {useEffect} from "react";
import ItemCard from "../../components/Cart/ItemCard/ItemCard";
import SummaryCard from "../../components/Cart/SummaryCard/SummaryCard";
import { connect } from 'react-redux';
import { fetchCart, deleteAllItemInCart } from '../../stores/user/user.actions';
import swal from 'sweetalert';
import { withTranslation } from 'react-i18next';

const Cart = ({
  t,fetchCartEffect, getDiscountCouponEffect, deleteAllItemInCartEffect,
  STORE_CART,STORE_USER, TOTAL_PRICE, SUBTOTAL_PRICE, DISCOUNT_PRICE, STORE_CART2}) => {
  
  //USER
  var userStore = STORE_USER.user && STORE_USER.user.data && STORE_USER.user.data.user ? STORE_USER.user.data.user : null ; 
  var cartForItemCard = STORE_USER.cart ;
  //###########################################################################################################################
   
    useEffect(()=>{

        setTimeout(()=>{

          var user = {
            userState: userStore  ? true : false,
            id: userStore && userStore.id ? userStore.id : 0,
            orderId: STORE_USER.cartDetaills.id ? STORE_USER.cartDetaills.id : 0
          }

          return fetchCartEffect(user)
        },500);

      },[fetchCartEffect, userStore, STORE_USER.cartDetaills.id]);    
    
      const handleDelete= () => {

        var user = {
          userState: userStore  ? true : false,
          id: userStore && userStore.id ? userStore.id : 0,
          orderId: STORE_USER.cartDetaills.id ? STORE_USER.cartDetaills.id : 0
        };
     
        swal({
            title: t("page.cart.alerts.emptyCart.title"),
            text: t("page.cart.alerts.emptyCart.text"),
            icon: "warning",
            buttons: true,
          }).then((willDelete) => {

            if (willDelete) {

              swal(t("page.cart.alerts.emptyCart.cartEmpty"), {
                icon: "success",
                timer: 2000
              });

             return deleteAllItemInCartEffect(user, cartForItemCard[0].orderId);

            } else {

              swal(t("page.cart.alerts.emptyCart.cartSafe"),{
                timer: 2000
              });

            };
          });
    };

    let ofertsDiscount = 0

     
    if(STORE_CART && STORE_CART.cart && STORE_CART.cart.length > 0 ){
      STORE_CART.cart.forEach(element => {
              if(element.product && element.product.oferts && element.product.oferts.length > 0){
          console.log("OFERTS",element.product.oferts)
          ofertsDiscount = ofertsDiscount + parseInt(element.product.oferts[0].discount)
        } 
      })
    }
    
      
    return (
        <div className="--Cart">
            <div className="--Cart-items">
              <h1>{t("page.cart.title")}</h1>
                {STORE_CART.cart && STORE_CART.cart.length > 0
                    ?(
                      <>
                        <div>
                        {
                         STORE_CART.cart.map((product, index)=>
                            {                           
                                if(product.product){
                                  return (
                                    <ItemCard key={index} user_store={STORE_USER}
                                     cartForItemCard={cartForItemCard} id={product.product.id}
                                     img={product.product.image} name={product.product.name} 
                                     autor={product.product.artist} price={product.product.price}
                                     ofert={product.product.oferts}
                                     />
                                  )
                                }else{
                                  console.log("EL PRODUCTO SE GUARDO DISTINTO EN EL CART")
                                }
                                return console.log("MAP ITEMS")
                            }
                          )
                        }
                        </div>
                        <div>
                            <button className="--Cart-deleteCart" onClick={()=>handleDelete()}>
                              {t("page.cart.alerts.emptyCart.btn")}
                            </button>
                        </div>
                      </>
                    ):
                    (
                        <p className="empty-cart">{t("page.cart.alerts.emptyCart.noItems")}</p>
                    )
                }
            </div>
            <SummaryCard 
              subtotal={SUBTOTAL_PRICE}
              total={TOTAL_PRICE} discount={DISCOUNT_PRICE}
              discountOferts={ofertsDiscount ? ofertsDiscount : 0}
            />
        </div>
    )
};

const mapStateToProps =  state => {
    return {
      STORE_CART : state.userReducers,
      TOTAL_PRICE : state.userReducers.totalPrice,
      SUBTOTAL_PRICE : state.userReducers.subtotalPrice,
      DISCOUNT_PRICE : state.userReducers.coupon,
      STORE_USER : state.userReducers
    };
  };

const mapDispatchToProps = dispatch =>{
    return {
        fetchCartEffect: (user) => dispatch(fetchCart(user)),
        deleteAllItemInCartEffect: (user, orderId) => dispatch(deleteAllItemInCart(user, orderId)),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Cart));
