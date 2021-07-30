import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../../stores/admin/admin.actions';
import UserCard from './UserCard.js'
import AdminNav from '../../../pages/Admin/AdminNav/AdminNav';
import "./adminListUser.css";

const Admin = ({ fetchAllUsersEffect, GET_ALL_USERS, USER_STATE }) => {
  //USER IDENTIFICATION FOR REDUCER #############################################
  let userStore =
    USER_STATE.user && USER_STATE.user.data && USER_STATE.user.data.user
      ? USER_STATE.user.data.user
      : null;
  let user = {
    userStatus: userStore ? true : false,
    id: userStore && userStore.id ? userStore.id : 0,
    orderId: USER_STATE.cartDetaills.id ? USER_STATE.cartDetaills.id : 0,
    rol: userStore && userStore.rol ? userStore.rol : 0,
  };
  //#############################################################################
  useEffect(() => {
    fetchAllUsersEffect()
  }, [fetchAllUsersEffect]);


  return (
    <>
      {user && user.rol === "admin"
        ?
        (
          <>
            <AdminNav></AdminNav>
            <main className="--adminListUsers--main-panel">
              <div className="--Cart-title">
                <h1>User list</h1>
              </div>
              <div className="--adminListUsers--main-div">
                {GET_ALL_USERS && GET_ALL_USERS.length > 0
                  ? (
                    <>
                      {GET_ALL_USERS.map((user, index) => {
                        return (
                          <UserCard key={index} user={user} action={fetchAllUsersEffect} admin={USER_STATE}></UserCard>
                        )
                      })}
                    </>
                  ) : (
                    <h2>No Users</h2>
                  )
                }
              </div>
            </main>
          </>
          ) : (
          <div className="--admin--main-panel" >
            <h1>Acceso Denegado Only Admin Can Be See This Page</h1>
          </div>
        )
      }
    </>
  );
};

const mapStateToProps = state => {
  return {
    GET_ALL_USERS: state.adminReducers.users,
    USER_STATE: state.userReducers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsersEffect: () => dispatch(fetchAllUsers()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Admin);