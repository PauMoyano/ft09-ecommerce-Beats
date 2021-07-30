import "./addcategorynew.scss";
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {connect} from "react-redux";
import { withTranslation } from 'react-i18next';
import { serverUrl } from '../../../auxiliar/variables';
import AdminNav from '../../../pages/Admin/AdminNav/AdminNav';
import swal from 'sweetalert';
import axios from "axios";
import spinner from "../../../assets/images/Spin-1s-200px.svg";

//Homeros
import HomerMonito from "../../../assets/images/spiners-homers/homero-monito.gif"
function AddCategoriesNew({ t, STORE_USER }) {

  //USER IDENTIFICATION #########################################################################
  let userStore = STORE_USER.user && STORE_USER.user.data && STORE_USER.user.data.user
      ? STORE_USER.user.data.user
      : null;
  let user = {
    userStatus: userStore ? true : false,
    id: userStore && userStore.id ? userStore.id : 0,
    orderId: STORE_USER.cartDetaills.id ? STORE_USER.cartDetaills.id : 0,
    rol: userStore && userStore.rol ? userStore.rol : 0,
  };

  // HOOK useForm ###############################################################################
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [postLoading, setPostLoading] = useState(false);
  
  // FUNCTION  onSubmit #########################################################################
  const onSubmit = (data) => {

    let category = {
      name: data.categorieName,
      description: data.categorieDescription
    };

     return postCategorie(category);
  };

  // FUNCTION postCategorie ####################################################################
  const postCategorie = async (category)=>{

      setPostLoading(true);

      const options = {
        method: 'POST',
        url: `${serverUrl}/categories`,
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem("token")
        },
        data: {name: category.name , description: category.description }
      };

     return await axios.request(options).then(response => {
        
        setTimeout(()=>{
          return setPostLoading(false);
        },1000);

        //errors back handles
        if(response.data.original && response.data.original.code === "23505"){
          swal(`The genre already exists`);
        }else if(response.data.original){
          swal(`Error Genres dont added`);
        }else if(response.data.errors && response.data.errors[0].message === "invalid category name length"){
          swal(`invalid category name length`);
        }else{
          //category added
          swal(`Add Genres Successful`);
        };

      }).catch(error => {
        swal(`${error}`);
      });
  };


  return (
    <>
      {user && user.rol === "admin"
        ? (
          <>
            <AdminNav/>
            <div className="--add-categories-main">
                  <h1>{t("page.admin.forms.addGen.title")}</h1>
              <div className="--add-categories-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {/* INPUT CATEGORIE NAME  */}
                        <label 
                          name="--add-categories-form-categorie-name">
                          {t("page.admin.forms.addGen.name")}
                        </label>
                        <input 
                        name="categorieName"
                        autoComplete="off"
                        placeholder={t("page.admin.forms.addGen.placeholderOne")}
                        className="--add-categories-form-input-name"
                        {...register("categorieName", { required: true }, { minLength: 2, maxLength: 12 })}
                        type="text"/>
                        {/* errors will return when field validation fails  */}
                        {errors.categorieName && <span>{t("page.admin.forms.addGen.errorName")}</span>}
                        {errors.categorieName && errors.categorieName.type === 'minLength' && (
                        <span>This is field required min lengh</span>)}
                        
                    </div>
                    <div>
                        {/* INPUT CATEGORIE DESCRIPTION  */}
                        <label 
                          name="--add-categories-form-categorie-description">
                            {t("page.admin.forms.addGen.description")}
                        </label>
                        <input 
                        name="categorieDescription"
                        autoComplete="off"
                        placeholder={t("page.admin.forms.addGen.placeholderTwo")}
                        className="--add-categories-form-input-description"
                        {...register("categorieDescription", { required: true })}
                        type="text"/>
                        {/* errors will return when field validation fails  */}
                        {errors.categorieDescription && <span>{t("page.admin.forms.addGen.errorDescription")}</span>}
                    </div>
                    <div>
                      <button type="submit">
                        {postLoading
                          ?(
                            <img src={spinner} alt="spiner"></img>
                          ):(
                            t("page.admin.forms.addGen.submit")
                          )
                        }  
                      </button>  
                    </div>                
                </form>
              </div>
              <div className={"--add-categories-homer"}>
                {errors.categorieDescription || errors.categorieName
                ?(
                  <img
                  src={HomerMonito} alt="homer error"></img>
                ):(
                  ""
                )
                }
              </div>
            </div>
          </>
          ) : (
          <div>
            <h1>Acceso Denegado Only Admin Can Be See This Page</h1>
          </div>
        )
      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    STORE_USER: state.userReducers
  };
};

export default connect(mapStateToProps)(withTranslation()(AddCategoriesNew));
