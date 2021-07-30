import React, {useState} from 'react';
import './edituserprofile.scss';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {serverUrl} from "../../../../auxiliar/variables";
import {useHistory} from "react-router-dom";

import axios from "axios";

const EditUserProfile = ({t,STORE_USER })=>{
 const history = useHistory()
 const [photo, setPhoto] = useState("FIRST");
 const [upload, setUpload] = useState();
 const [name, setName] = useState();
//  const [email, setEmail] = useState();

  //USER IDENTIFICATION FOR REDUCER #############################################
  let userStore =
    STORE_USER.user && STORE_USER.user.data && STORE_USER.user.data.user
      ? STORE_USER.user.data.user
      : null;
   let user = {
     userStatus: userStore ? true : false,
     id: userStore && userStore.id ? userStore.id : 0,
     name: userStore && userStore.name ? userStore.name : 0,
     email: userStore && userStore.email ? userStore.email : 0,
     orderId: STORE_USER.cartDetaills.id ? STORE_USER.cartDetaills.id : 0,
   };
  //#############################################################################
    const handleImage = (e)=>{
        console.log(e.target.value);
        setPhoto(URL.createObjectURL(e.target.files[0]));
        setUpload(e.target.files[0]);
    };

    const handleUpdate = async  (e)=>{
        try {
            const form = new FormData();
                  form.append("id", user.id);
                  form.append("name", name || user.name);
                  form.append("email", user.email);
                  form.append("files", upload || userStore.image);
      
            const options = {
              method: "PUT",
              url: `${serverUrl}/users/update/feli`,
              headers: {
                "Content-Type": "multipart/form-data", "Cross-Origin-Opener-Policy": "same-origin",
                "token": localStorage.getItem("token")
              },
              data: form,
            };
      
          await axios.request(options).then(function (response) {
                console.log(response.data);
                history.push("/profile")
            })
        }
        catch(e){
            console.log("Error Upate user",e.message)
        }

    };

    const handleName = (e)=>{
        console.log(e.target.value);
        setName(e.target.value);
    };

    const handleEmail = (e)=>{
        console.log(e.target.value);
        // setEmail(e.target.value);
    };
    const handleCansel = (e)=>{
        history.push("/profile")
    };

    return (
        <>
       {STORE_USER && STORE_USER.user && STORE_USER.user.data
           ?(
            <div className="--edit-profile-main">

            <div className="--edit-profile-main-form">
                <div className="--edit-profile-main-title">
                    <h1>Edit Profile</h1>
                </div>
                <div className="--edit-profile-main-photo">
                    <div className="--edit-profile-main-photo-upload">
                        <label htmlFor="inp-file">
                            {photo === "FIRST"
                                ?(
                                    <img
                                    className="--edit-profile-main-photo-upload-img"
                                    width="150px" src={`${serverUrl}/images/${userStore.image}`} alt="User Img"></img>
                                ):(
                                    <img
                                    className="--edit-profile-main-photo-upload-img"
                                    width="150px" src={photo} alt="User Img"></img>
                                )
                            }
                        </label>
                        <input
                      
                        onChange={(e)=> handleImage(e)}
                        id="inp-file" name="inp-file" type="file"></input>
                    </div>
                </div>
                <div className="--edit-profile-main-input">
                    <label>Name</label>
                    <input
                    className="--edit-profile-main-inputs"
                    placeholder={user.name}
                    onChange={(e)=> handleName(e)}
                    type="text"></input>
                </div>
                <div className="--edit-profile-main-input">
                    <label>Email</label>
                    <input 
                      className="--edit-profile-main-inputs"
                    placeholder={user.email}
                    disabled
                    onChange={(e)=> handleEmail(e)}
                    type="text"></input>
                </div>
                <div className="--edit-profile-main-buttons">
                    <button
                    onClick={handleCansel}
                    className="--edit-profile-main-buttons-cancel"
                    >Cancel</button>
                    <button
                    className="--edit-profile-main-buttons-save"
                    onClick={(e)=> handleUpdate(e)}
                    >Save</button>
                </div>
            </div>
        </div>
           ):(
            <p>Only Register Users</p>
           )
       }
       </>
    )
};


const mapStateToProps = (state) => {
    return {
        STORE_USER: state.userReducers,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      //fetchAllProductsEffect: () => dispatch(fetchAllProducts()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EditUserProfile));


