import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import "./addofert.scss";
import AdminNav from "../../AdminNav/AdminNav";
import {serverUrl} from "../../../../auxiliar/variables";
import axios from "axios";
import {fetchAllOferts} from "../../../..//stores/admin/admin.actions";


const AddOfert = ({ fetchAllOfertsEffect, STORE_OFERTS })=>{

    useEffect(() => {
        fetchAllOfertsEffect()
    }, [fetchAllOfertsEffect])


    const [input, setInput] = useState({
        name: "",
        ofertStatus: "none",
        discount: 0
    })

    const handleInputChange = async (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }


    const handleCreateOffer = async (e)=>{
        e.preventDefault()
        const options = {
            method: 'POST',
            url: `${serverUrl}/oferts`,
            headers: {
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token')
            },
            data: input
          };
        e.target.reset()
        return await axios.request(options)
    }
    return (
        <>
        <AdminNav></AdminNav>
        {STORE_OFERTS && STORE_OFERTS.length > 0
            ?(
                <div className='--AddOffer-main'>
                <h2 className='--AddOffer-main-h2'>Join our monthly Newsletter and get 10% off your next Purchase!</h2>
                <form className="--AddOffer-form" onSubmit={handleCreateOffer}>
                    <div className="--inputs-first"> 
                        <div className="--inputs-first-col">
                        <label className='name'>Discount</label>
                            <input 
                                placeholder='Type in Discount Name'
                                className="--RPInput" 
                                onChange={handleInputChange} 
                                type="name" 
                                name="name" 
                                required/>
                        </div>
                        <div className="--inputs-first-col">
                        <label className='discount'></label>
                            <input 
                                placeholder='Type in Discount'
                                className="--RPInput-num" 
                                onChange={handleInputChange} 
                                type="number" 
                                name="discount" 
                                required/>
                        </div>
                        <div className="--inputs-first-col">
                        <label className='ofertStatus'></label>
                            <select
                                className="select-ofert-status" 
                                name="ofertStatus"
                                onChange={handleInputChange}>
                                <option value="none" selected>none</option>
                                <option value="day" >day</option>
                                <option value="week">week</option>
                                <option value="month">month</option>
                                <option value="season">season</option>
                                <option value="holiday">holiday</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button className="--AddOfferButton" type='submit'>Suscribe</button>
                    </div>
                </form>
            </div>
            ):(
                <p>No oferts</p>
            )
        }
        </>
       
    )
};

const mapStateToProps = (state) => {
    return {
        STORE_PRODUCTS: state.productsReducers,
        STORE_OFERTS: state.adminReducers.oferts,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllOfertsEffect: () => dispatch(fetchAllOferts())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOfert);
