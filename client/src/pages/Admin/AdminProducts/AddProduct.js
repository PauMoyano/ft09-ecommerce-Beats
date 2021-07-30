import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import Select from "react-select";
import axios from "axios";
import laserSound from "../../../assets/audio/tab-sound.ogg"
//Internationalization
import './newform.scss';
import { withTranslation } from 'react-i18next';
import swal from 'sweetalert';
import { serverUrl } from '../../../auxiliar/variables';
import AdminNav from "../AdminNav/AdminNav";
import {useHistory} from "react-router-dom";


const Form = ({ t, STORE_USER }) => {
const history = useHistory();

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      position:'relative',
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'violet',
      background:'black',
      fontWeight: 800,
      padding: 10,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      const font = "fontWeight 800";
      return { ...provided, opacity, transition, font };
    }
  }

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


  //Audio Error
  const audioErr = new Audio(laserSound)

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState({});
  const [audio, setAudio] = useState();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({});
  const [cat, setCat] = useState([]);
  const [alt, setAlt] = useState({});
  const [tone, setTone] = useState({});

  const handleAlt = (e) => {
    
    console.log("handleAlt", e.target.value)
    
    setAlt({
      ...alt,
      [e.target.name]: e.target.value
    });

  };

  useEffect(() => {
    const datos = async () => {
      return await fetch(`${serverUrl}/categories`)
        .then((response) => response.json())
        .then((optionCategories) => {
          return setCat(optionCategories);
        });
    };
    datos();
  }, []);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    // let formInputs = {
    //   name: input.name,
    //   description: input.description,
    //   artist:input.artist,
    //   price:input.price,
    //   bpm:input.bpm,
    //   scale: alt.radName === undefined ? tone.value : tone.value + alt.radName,
    //   date:input.date,
    //   image:image[0],
    //   audio:audio[0]
    // }
    // console.log(formInputs)

    try {

      var form = new FormData();
          form.append("name", input.name);
          form.append("description", input.description);
          form.append("artist", input.artist);
          form.append("price", input.price);
          form.append("bpm", input.bpm);
          form.append("scale", alt.radName === undefined ? tone.value : tone.value + alt.radName);
          form.append("date", input.date);
          form.append("selectCat", cat.selectCat);
          form.append("files", image[0]);
          form.append("files", audio[0]);

      const options = {
        method: "POST",
        url: `${serverUrl}/products/`,
        headers: {
          "Content-Type": "multipart/form-data", 
          "token": localStorage.getItem("token")
        },
        data: form,
      };

      return await axios.request(options).then(response => {
        categories.forEach(async (element) => {
          return await axios.post(`${serverUrl}/products/${response.data.id}/category/${element.value}`).then((res) => console.log(res));
        })

        swal({
          title: "item added",
          icon: "success",
          //buttons: true,
        }).then(()=>{
          history.push("/admin/listproducts")
        })

      });
    } catch (error) {
      audioErr.play();
      swal({
        title: "Error Beat Dont Added",
        icon: "danger",
        //buttons: true,
      });
    }
  };

  const optionTone = [{
    value: "c",
    label: t("page.admin.forms.addBeats.notes.c")
  }, {
    value: "d",
    label: t("page.admin.forms.addBeats.notes.d")
  }, {
    value: "e",
    label: t("page.admin.forms.addBeats.notes.e")
  }, {
    value: "f",
    label: t("page.admin.forms.addBeats.notes.f")
  }, {
    value: "G",
    label: t("page.admin.forms.addBeats.notes.g")
  }, {
    value: "A",
    label: t("page.admin.forms.addBeats.notes.a")
  }, {
    value: "B",
    label: t("page.admin.forms.addBeats.notes.b")
  }];

  const handleInputChange = (event) => {

    console.log("handleInputChangue", event.target.value)

    if (event.target.name === "image") {
      setImage(event.target.files);

    } else if (event.target.name === "audio") {
      setAudio(event.target.files);
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    };

    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );

  };

  function validate(input) {

    let errors = {};

    if (!input.name) {
      errors.name = t("page.admin.forms.addBeats.errors.inpName");
    }
    if (!input.description) {
      errors.description = t("page.admin.forms.addBeats.errors.inpDescription");
    }
    if (!input.artist) {
      errors.artist = t("page.admin.forms.addBeats.errors.inpArtist");
    }
    if (!input.price) {
      errors.price = t("page.admin.forms.addBeats.errors.inpPrice");
    }
    if (!input.bpm) {
      errors.bpm = t("page.admin.forms.addBeats.errors.inpBpm");
    }

    if (!input.date) {
      errors.date = t("page.admin.forms.addBeats.errors.inpDate");
    }

    var today = new Date();
    var msecsToday = today.getTime();
    var msecsProduct = Date.parse(input.date);

    if(msecsProduct > msecsToday){
      (errors.date = t("page.admin.forms.addBeats.errors.inpValidDate"))
    }else{
      console.log("msec product es menor que msec today");
    }

    if (!tone.value) {
      errors.tone = t("page.admin.forms.addBeats.errors.inpTone");
    }
    if (!image) {
      errors.image = t("page.admin.forms.addBeats.errors.inpImage");
    }
    if (!audio) {
      errors.audio = t("page.admin.forms.addBeats.errors.inpAudio");
    }

    return errors;
  }

  var option;

  if (cat && cat.length > 0) {
    option = cat.map((c) => {
      return {
        value: c.id,
        label: c.name,
      };
    });
  };

  return (
    <>

      {user && user.rol === "admin"
        ? (
          <>
            <AdminNav></AdminNav>
              <div  className="--add-product-newform-col-0">
                <h2>{t("page.admin.forms.addBeats.title")}</h2>
              </div>
              <div className="--all-container-form">
               <div className="--add-product-new-container"> 
                  <form encType="multipart/form-data"  className=".--add-product-newform" onSubmit={(e) => handleSubmit(e)}>
                    <div className="--add-product-newform-container">
                    
                      <div className="--add-product-newform-col-1">
                          <div className="--add-product-newform-col-1-interna-1">

                              <div className="--colum-helper --add-product-newform-input">
                                <label>
                                  {t("page.admin.forms.addBeats.name")} </label>
                                  <input
                                    autoComplete="off"
                                    placeholder={errors.name ?(errors.name):("")}
                                    className={`${errors.name && "--colum-helper-danger"}`}
                                    name="name"
                                    onChange={(e) => { handleInputChange(e); }}
                                  />
                                 
                              </div>
                              <div className="--colum-helper --add-product-newform-input">
                                <label>{t("page.admin.forms.addBeats.artist")}</label>
                                  <input
                                    autoComplete="off"
                                    placeholder={errors.artist?(errors.artist):("") }
                                    className={`${errors.artist && "--colum-helper-danger"}`}
                                    name="artist"
                                    onChange={(e) => { handleInputChange(e); }}
                                  ></input>
                              </div>

                              <div className="--colum-helper-doble --add-product-newform-input-doble">
                                    <div>
                                      <label>{t("page.admin.forms.addBeats.price")}</label>
                                      {errors.price && <p className="--colum-helper-danger">{errors.price}</p>}
                                        <input
                                          autoComplete="off"
                                          className={`${errors.price && "--colum-helper-danger"}`}
                                          name="price"
                                          type="number"
                                          onChange={(e) => { handleInputChange(e) }}
                                        ></input>
                                    </div>
                                    <div>
                                    <label>{t("page.admin.forms.addBeats.bpm")}</label>
                                    {errors.bpm && <p className="--colum-helper-danger">{errors.bpm}</p>}
                                      <input
                                        autoComplete="off"
                                      
                                        className={`${errors.bpm && "--colum-helper-danger"}`}
                                        name="bpm"
                                        type="number"
                                        onChange={(e) => { handleInputChange(e) }}
                                      ></input>
                                    </div>
                                    
                              </div>

                              <div className="--colum-helper --add-product-newform-input">
                              <label className='--labelImage'>{t("page.admin.forms.addBeats.image")}</label>
                              <input
                                className="buttonInput"
                                type="file"
                                name="image"
                                onChange={(e) => handleInputChange(e) }
                              ></input>
                            </div>
                              <div  className="--add-product-newform-radioTone-select-tone">
                              <label>{t("page.admin.forms.addBeats.tone")}</label>
                                <Select
                                  name="selectTone"
                                  className="--select"
                                  placeholder={errors.tone?(errors.tone):("Select...")}
                                  options={optionTone}
                                  onChange={setTone}
                                  styles={customStyles}
                                
                                />
                              </div>
                              
                          </div>
                          <div className="--add-product-newform-col-1-interna-2">
                          <div className=" --colum-helper --add-product-newform-input">
                                <label>{t("page.admin.forms.addBeats.description")}</label>
                                  <textarea
                                    placeholder={errors.description?(errors.description):("")}
                                    className={`${errors.description && "--colum-helper-danger"}`}
                                    name="description"
                                    onChange={(e) => { handleInputChange(e) }}
                                  ></textarea>
                              </div>
                              <div className="--add-product-newform-radioTone">

                              <div className="--add-product-newform-radioTone-radioColumn" >
                                <label>natural</label>
                                <input type="radio" name="radName" value="" />
                              </div>
                              <div className="--add-product-newform-radioTone-radioColumn" >
                                <label># </label>
                                <input 
                                  type="radio"
                                  name="radName"
                                  value="#"
                                  onChange={handleAlt} />

                              </div>
                              <div className="--add-product-newform-radioTone-radioColumn">
                                <label >b</label>
                                <input
                                  type="radio"
                                  name="radName"
                                  value="b"
                                  onChange={handleAlt} 
                                />
                              </div>
                              </div>


                            <div className="--colum-helper --add-product-newform-input">
                              <label>{t("page.admin.forms.addBeats.date")}</label>
                              {errors.date && <p className="--colum-helper-danger">{errors.date}</p>}
                              <input
                                autoComplete="off"
                                placeholder={errors.date?(errors.date):("")}
                                className={` ${errors.date && "--colum-helper-danger"}`}
                                type="date"
                                name="date"
                                onChange={(e) => handleInputChange(e) }
                              ></input>
                            </div>

                            <div className="--colum-helper --add-product-newform-input">
                              <label className='--labelAudio'>{t("page.admin.forms.addBeats.audio")}</label>
                              <input
                                className="buttonInput"
                                type="file"
                                name="audio"
                                onChange={(e) => handleInputChange(e) }
                              ></input>

                            </div>
                            <div className="--add-product-newform-category">
                                <label>{t("page.admin.forms.addBeats.categories")}</label>    
                                <Select
                                  isMulti
                                  name="selectCat"
                                  options={option}
                                  onChange={setCategories}
                                  styles={customStyles}
                                />
                              </div>


                        </div>
                    </div>

                      <div  className="--add-product-newform-col-2">
                        <button
                          type="submit"
                          onChange={(e) => { handleInputChange(e)  }}
                        >
                          {t("page.admin.forms.addBeats.addBeatButton")}
                        </button>
                      </div>

                    </div>
                  </form>
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
}

const mapStateToProps = (state) => {
  return {
    STORE_USER: state.userReducers
  };
};
export default connect(mapStateToProps)(withTranslation()(Form));