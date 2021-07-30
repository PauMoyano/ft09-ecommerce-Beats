import "./listCat.css";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AdminNav from "../AdminNav/AdminNav";
import swal from 'sweetalert';
import { deleteCategory, fetchAllCategories } from "../../../stores/admin/admin.actions";
const ListCategories = ({ fetchAllCategoriesEffect, deleteCategoryEffect, STORE_CATS, STORE_USER }) => {
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
  const history = useHistory();

  useEffect(() => {
    fetchAllCategoriesEffect()
  }, [fetchAllCategoriesEffect]);

  const handleClickEdit = (categoryId, name, description) => {
    history.push(`/editCat/${categoryId}/${name}/${description}`);
  };
  const handleClickDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal(" the category has been deleted!", {
            icon: "success",
          });
          deleteCategoryEffect(id);
        } else {
          swal("the category is safe!");
        }
      });


  }
  return (
    <>

      {user && user.rol === "admin"
        ? (
          <>
            <AdminNav></AdminNav>
            <div className="list-users-main">
              <div className="--Cart-categorie">
                <div className="--Cart-title">
                  <h1>Categories list</h1>
                </div>
                <div className="--Cart-items">
                  {STORE_CATS && STORE_CATS.length > 0 ? (
                    <>
                      <div>
                        {STORE_CATS.map((category, index) => {
                          return (
                            <div key={index} className="--ItemCard">
                              <div className="--ItemCard-left">
                                <div className="--ItemCard-data">
                                  <h2>{category.name}</h2>
                                  <p>{category.description}</p>
                                </div>
                              </div>
                              <div className="--ItemCard-right">
                                <span onClick={() => handleClickEdit(category.id, category.name, category.description)}>
                                  <i className="far fa-edit --ItemCard-editItem"></i>
                                </span>
                                <span onClick={() => handleClickDelete(category.id)}>
                                  <i className="fas fa-trash-alt --ItemCard-deletItem"></i>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div></div>
                    </>
                  ) : (
                    <p className="empy-cart">Empy Cart</p>
                  )}
                </div>
              </div>
            </div>
          </>) : (
          <div className="--admin--main-panel" >
            <h1>Acceso Denegado Only Admin Can Be See This Page</h1>
          </div>
        )
      }
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    STORE_CATS: state.adminReducers.categories,
    STORE_USER: state.userReducers
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCategoriesEffect: () => dispatch(fetchAllCategories()),
    deleteCategoryEffect: (id) => dispatch(deleteCategory(id)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);
