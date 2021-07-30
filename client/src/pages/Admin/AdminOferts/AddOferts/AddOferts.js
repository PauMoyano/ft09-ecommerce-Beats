import "./addoferts.scss";
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {connect} from "react-redux";
import axios from "axios";
import { withTranslation } from 'react-i18next';
import { serverUrl } from '../../../../auxiliar/variables';
import spinner from "../../../../assets/images/Spin-1s-200px.svg";
import swal from 'sweetalert';
import AdminNav from '../../../../pages/Admin/AdminNav/AdminNav';
//Homeros
import HomerRebotin from "../../../../assets/images/spiners-homers/homero-rebotin.gif"
import { useParams } from "react-router-dom";

function AddCategoriesNew({ t, STORE_USER }) {
  const {idProduct} = useParams();
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
  const { register,handleSubmit, formState: { errors } } = useForm();
  const [postLoading, setPostLoading] = useState(false);

  // FUNCTION  onSubmit #########################################################################
  const onSubmit = (data) => {
    let ofert = {
      name: data.ofertName,
      discount: data.ofertDiscount,
      ofertStatus: data.ofertStatus
    };

     return postCategorie(ofert);
  };

  // FUNCTION postCategorie ####################################################################
  const postCategorie = async (ofert)=>{

      setPostLoading(true);

      const options = {
        method: 'POST',
        url: `${serverUrl}/oferts/${idProduct}`,
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem("token")
        },
        data: {name: ofert.name, ofertStatus: ofert.ofertStatus , discount: ofert.discount }
      };

     return await axios.request(options).then(response => {
        
        setTimeout(()=>{
          return setPostLoading(false);
        },1000);

        //errors back handles
        if(response.data.original && response.data.original.code === "23505"){
          swal(`The ofert already exists`);
        }else if(response.data.original){
          swal(`Error ofert dont added`);
        }else if(response.data.errors && response.data.errors[0].message === "invalid category name length"){
          swal(`invalid ofert name length`);
        }else{
          //category added
          swal(`Add Ofert Successful`);
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
            <div className="--add-oferts-main">
                  <h1>{t("page.admin.forms.addOfert.title")}</h1>
              <div className="--add-oferts-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {/* INPUT OFERT NAME  */}
                        <label 
                          name="ofertName">
                          {t("page.admin.forms.addOfert.name")}
                        </label>
                        <input 
                        name="ofertName"
                        autoComplete="off"
                        placeholder={t("page.admin.forms.addOfert.placeholderOne")}
                        {...register("ofertName", { required: true }, { minLength: 2, maxLength: 12 })}
                        type="text"/>
                        {/* errors will return when field validation fails  */}
                        {errors.ofertName && <span>{t("page.admin.forms.addOfert.error.name")}</span>}
                        
                    </div>
                    <div>
                        {/* INPUT OFERT DESCRIPTION  */}
                        <label 
                          name="ofertDiscount">
                            {t("page.admin.forms.addOfert.discount")}
                        </label>
                        <input 
                        name="ofertDiscount"
                        autoComplete="off"
                        placeholder={t("page.admin.forms.addOfert.placeholderTwo")}
                        {...register("ofertDiscount", { required: true })}
                        type="number"/>
                        {/* errors will return when field validation fails  */}
                        {errors.ofertDiscount && <span>{t("page.admin.forms.addOfert.error.discount")}</span>}
                    </div>
                    <div>
                        <label>{t("page.admin.forms.addOfert.mode.title")}</label>
                            <select
                                name="ofertStatus"
                                {...register("ofertStatus")}
                                >
                                <option value="none" selected>{t("page.admin.forms.addOfert.mode.1")}</option>
                                <option value="day" >{t("page.admin.forms.addOfert.mode.2")}</option>
                                <option value="week">{t("page.admin.forms.addOfert.mode.3")}</option>
                                <option value="month">{t("page.admin.forms.addOfert.mode.4")}</option>
                                <option value="season">{t("page.admin.forms.addOfert.mode.5")}</option>
                                <option value="holiday">{t("page.admin.forms.addOfert.mode.6")}</option>
                            </select>
                        </div>
                    <div>
                      <button type="submit">
                        {postLoading
                          ?(
                            <img src={spinner} alt="spiner"></img>
                          ):(
                           t("page.admin.forms.addOfert.submit")
                            )
                          }
                      </button>  
                    </div>                
                </form>
              </div>
              <div className={"--add-oferts-homer"}>
                {errors.ofertDescription || errors.ofertName
                ?(
                  <img
                  src={HomerRebotin} alt="homer error"></img>
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
