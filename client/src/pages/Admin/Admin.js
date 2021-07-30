import React from "react";
import "./admin.css";
import {connect} from "react-redux";
import { withTranslation } from 'react-i18next';
import AdminNav from '../../pages/Admin/AdminNav/AdminNav';

//components
import OrderWidget from "./AdminDashboard/OrdersWidget/OrdersWidget";
import ProductsWidget from "./AdminDashboard/ProductsWidget/ProductsWidget";

//Homer Spinners
import HomerSecuriy from  "../../assets/images/spiners-homers/homero-fbi-2.gif";

const Admin = ({t, STORE_USER}) => {
   //USER IDENTIFICATION FOR REDUCER #############################################
   let userStore =
   STORE_USER.user && STORE_USER.user.data && STORE_USER.user.data.user
     ? STORE_USER.user.data.user
     : null;
 let user = {
   userStatus: userStore ? true : false,
   id: userStore && userStore.id ? userStore.id : 0,
   orderId: STORE_USER.cartDetaills.id ? STORE_USER.cartDetaills.id : 0,
   rol: userStore && userStore.rol ? userStore.rol : 0,
 };
 //#############################################################################

  return (
    <>
    {user && user.rol === "admin"
      ?(
    <main className="--admin--main-panel">
      <AdminNav/>
      <OrderWidget/>
      <ProductsWidget/>
    </main>
      ):(
        <div className="--admin--main-panel" >
          <div>
            <h1>Acceso Denegado Only Admin Can Be See This Page</h1>
          </div>
          <div>
            <img src={HomerSecuriy} alt="homer security"></img>
          </div>
        </div>
      )
    }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    STORE_USER: state.userReducers
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      //fetchUserInBoxEffect: (idUser) => dispatch(fetchUserInBox(idUser)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Admin));
