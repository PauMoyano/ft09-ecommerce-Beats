import React, { useEffect} from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import "./form.css";
import Select from "react-select";
import axios from "axios";
import "../../Product/product.css";
//Internationalization
import { withTranslation } from 'react-i18next';
import { fetchOneProduct } from "../../../stores/admin/admin.actions";
import AdminNav from "../AdminNav/AdminNav";
import {serverUrl} from '../../../auxiliar/variables';

const PutForm = ({t, STORE_ADMIN, fetchProduct }) => {

  const storeProduct = STORE_ADMIN.product;

  const { idProducts } = useParams();

  useEffect(() => {
    fetchProduct(idProducts);
  }, [fetchProduct, idProducts]);

  const [categories, setCategories] = React.useState([]);
  const [oldImage, setOldImage] = React.useState({});
  const [oldAudio, setOldAudio] = React.useState();
  const [editAudio, setEditAudio] = React.useState("");
  const [editImage, setEditImage] = React.useState("");
  const [editFiles, setEditFiles] = React.useState("");
  const [image, setImage] = React.useState({});
  const [audio, setAudio] = React.useState();
  const [error, setError] = React.useState({});
  const [cat, setCat] = React.useState([]);
  const [alt, setAlt] = React.useState({})
  const [tone, setTone] = React.useState({})


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
  var product = {};

  if (storeProduct.name) {
    product = {
      name: storeProduct.name,
      description: storeProduct.description,
      artist: storeProduct.artist,
      price: storeProduct.price,
      bpm: storeProduct.bpm,
      scale: storeProduct.scale,
      date: storeProduct.date,
    };
  } else {
    product = {
      name: "No Product",
      description: "No Product",
      artist: "No Product",
      price: "No Product",
      bpm: "No Product",
      scale: "No Product",
      date: "No Product",
    };
  }
  const [input, setInput] = React.useState({
    name:"",
    description:"",
    artis:"",
    price:"",
    bpm:"",
    scale:"",
    date:""
  });


  const handleAlt = (e) => {
    setAlt({
      ...alt,
      [e.target.name]: e.target.value
    })

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ESTO ES IMAGE:",JSON.stringify(tone))
    const form = new FormData();
    form.append("name", input.name ? input.name : storeProduct.name);
    form.append("description", input.description ? input.description : storeProduct.description);
    form.append("artist", input.artist ? input.artist : storeProduct.artist);
    form.append("price", input.price ? input.price : storeProduct.price);
    form.append("bpm", input.bpm ? input.bpm : storeProduct.bpm);
    form.append("scale", tone.value ? tone.value + (alt.radName ? alt.radName : " " ) : "NO SET");
    form.append("date", input.date ? input.date : storeProduct.date);
    form.append("selectCat", cat.selectCat ? cat.selectCat : storeProduct.categories );
    form.append("files", image && image[0]? image[0]: "");
    form.append("files", audio && audio[0]? audio[0]: "");
    form.append("oldImage", oldImage);
    form.append("oldAudio", oldAudio);
    form.append("editImage", editImage);
    form.append("editAudio", editAudio);
    form.append("editFiles", editFiles);

    const options = {
      method: "PUT",
      url: `${serverUrl}/products/${idProducts}`,
      headers: {
        "Content-Type": "multipart/form-data", "Cross-Origin-Opener-Policy": "same-origin"
      },
      data: form,

    };

    return await axios.request(options).then( async (response) =>{
      console.log(categories);
      categories.forEach(async(element) => {
        return await axios.post(`${serverUrl}/products/${idProducts}/category/${element.value}`).then((res) => console.log(res));});
         });     
        
      }
          
      
  const optionTone = [{
    value: "C",
    label: "C"
  }, {
    value: "D",
    label: "D"
  }, {
    value: "E",
    label: "E"
  }, {
    value: "F",
    label: "F"
  }, {
    value: "G",
    label: "G"
  }, {
    value: "A",
    label: "A"
  }, {
    value: "B",
    label: "B"
  }]

  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      
    if(storeProduct && storeProduct.image){
      setOldImage(storeProduct.image)
      console.log(storeProduct.image)
    }
      setImage(event.target.files);
      setEditImage("edit")
      setEditFiles("edit")
    } else if (event.target.name === "audio") {
      if(storeProduct && storeProduct.audio){
        setOldAudio(storeProduct.audio)
        console.log(storeProduct.audio)
      }
      setAudio(event.target.files);
      setEditAudio("edit")
      setEditFiles("edit")
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }
    setError(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  function validate(input) {
    let error = {};

    if (!input.name) {
      error.name = "name is required";
    }
    if (!input.description) {
      error.description = "description is required";
    }
    if (!input.artist) {
      error.artist = "artist is required";
    }
    if (!input.price) {
      error.price = "price is required";
    }
    if (!input.bpm) {
      error.bpm = "bpm is required";
    }

    if (!input.date) {
      error.date = "date is required";
    }
    var today = new Date();
    let msecsToday = today.getTime();
    var msecsProduct = Date.parse(input.date);
    msecsProduct > msecsToday
      ? (error.date = "insert a valid date!")
      : console.log("ok");
    if (!image) {
      error.image = "image is required";
    }
    if (!audio) {
      error.audio = "audio is required";
    }
    return error;
  }
  var option;

  if (cat && cat.length > 0) {
    option = cat.map((c) => {
      return {
        value: c.id,
        label: c.name,
      };
    });
  }
  return (
    <>
            <AdminNav></AdminNav>
            <div className="subContainer">
              <h2>{t("page.admin.forms.addBeats.title")}</h2>
              <div className="all--container-form" >
                <form className="formAdd" onSubmit={(e) => handleSubmit(e)}>
                <div className="container formAdd" >

                 <div className="column-1 box">
                  <label>{t("page.admin.forms.addBeats.name")}</label>
                    <input
                      placeholder={error.name?(error.name):(product.name)}
                      value={input.name}
                      className={`${error.name && "danger"}`}
                      name="name"
                      onChange={(e) => {
                      handleInputChange(e);
                      }}
                    />
                  <label>{t("page.admin.forms.addBeats.description")}</label>
                  <textarea
                    placeholder={error.description?(error.description):(product.description)}
                    value={input.description}
                    name="description"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  ></textarea>
                  <label>{t("page.admin.forms.addBeats.artist")}</label>
                  <input
                    placeholder={error.artist?(error.artist):(product.artist)}
                    value={input.artist}
                    name="artist"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  ></input>
                  <div className='--price--bpm' >
                    <div>
                      <label>{t("page.admin.forms.addBeats.price")}</label>

                    <input
                      placeholder={product.price}
                      value={input.price}
                      name="price"
                      type="number"
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    ></input>
                    </div>
                    <div>
                      <label>BPM</label>
                    <input
                      placeholder={product.bpm}
                      value={input.bpm}
                      name="bpm"
                      type="number"
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    ></input>
                    </div>
                    
                  </div>
                    <label className='--edit-categories-label'>{t("page.admin.forms.addBeats.categories")}</label>
                    <Select
                      placeholder={product.categories}
                      value={input.categories}
                      isMulti
                      name="selectCat"
                      options={option}
                      onChange={setCategories}
                    />
                </div>
                <div className="column-2 box">
              <div className="radioTone">
                <div className="radioColumn" >
                  <label >natural</label>
                  <input type="radio" name="radName" value="" />
                </div>
                <div className="radioColumn" >
                  <label ># </label>
                  <input type="radio" name="radName" value="#" onChange={handleAlt} />
                </div>
                <div className="radioColumn">
                  <label >b</label>
                  <input type="radio" name="radName" value="b" onChange={handleAlt} />
                </div>
              </div>
              <label>{t("page.admin.forms.addBeats.date")}</label>
              <input
                placeholder={product.date}
                value={input.date}
                id="dateClass"
                type="date"
                name="date"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></input>

              <label className='--edit-image-label'>{t("page.admin.forms.addBeats.image")}</label>

              <input
                className="buttonInput"
                type="file"
                name="image"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></input>
              <label className='--edit-audio-label'>{t("page.admin.forms.addBeats.audio")}</label>

              <input
                className="buttonInput"
                type="file"
                name="audio"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></input>
              <label className='--edit-tone-label'>{t("page.admin.forms.addBeats.tone")}</label>
              <Select
                placeholder={product.scale}
                value={tone}
                name="selectTone"
                options={ optionTone }
                onChange={setTone}
              />

            </div>
                </div>
                
                <button
                      className="--edit-submitbuton-new"
                      type="submit"
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    >
                      {t("page.admin.forms.addBeats.saveBeatButton")}
                    </button>
              </form>
              </div>
            </div>
          </>
  );
}

const mapStateToProps = (state) => {
  return {
    STORE_ADMIN: state.adminReducers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchOneProduct(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PutForm));
