import React, {useEffect} from "react";
import "../adminoferts.scss";
import AdminNav from "../../AdminNav/AdminNav";
import {connect} from "react-redux";
import {fetchAllOferts} from "../../../../stores/admin/admin.actions";
import ItemOfert from "./ItemOfert";
//import Select from "react-select";

const ListOferts = ({fetchAllOfertsEffect, STORE_OFERTS})=>{
   
  //  const [oferts, setOferts] = useState([])
    console.log(STORE_OFERTS)
    useEffect(() => {
        fetchAllOfertsEffect();
    }, [fetchAllOfertsEffect])


    return (
        <>
        <AdminNav></AdminNav>
            {STORE_OFERTS && STORE_OFERTS.length > 0
                ?(
                <div className="--admin-ofert-main">
                    <div className="--admin-ofert-main-col">
                        <h1>List Oferts</h1>
                    </div>
                    <div className="--admin-ofert-main-col">
                        {STORE_OFERTS.map((ofert, index)=>{
                            return  (
                            <ItemOfert
                            key={index}
                            idOfert={ofert.id}
                            name={ofert.name}
                            discount={ofert.discount}
                            ofertStatus={ofert.ofertStatus} />
                            )
                        })

                        }
                    </div>
                   <div className="ofert-select">
                      
                   </div>
                   
                </div>
                ):(
                    <p>No Oferts</p>
                )
            }
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        STORE_OFERTS: state.adminReducers.oferts,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllOfertsEffect: () => dispatch(fetchAllOferts())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOferts);

