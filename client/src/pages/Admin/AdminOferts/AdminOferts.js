import React, {useEffect} from "react";
import "./adminoferts.scss";
import AdminNav from "../AdminNav/AdminNav";
import {connect} from "react-redux";
import {fetchAllProducts} from "../../../stores/products/products.actions";
import {fetchAllOferts} from "../../../stores/admin/admin.actions";
import ListProducts from "./ListProducts/ListProducts";
import swal from "sweetalert";
//import Select from "react-select";

const ListOferts = ({fetchAllProductsEffect,fetchAllOfertsEffect, STORE_PRODUCTS, STORE_OFERTS})=>{
   
  //  const [oferts, setOferts] = useState([])
      
    useEffect(() => {
        fetchAllProductsEffect();
        fetchAllOfertsEffect();
    }, [fetchAllOfertsEffect, fetchAllProductsEffect])

    const handleAddOfert = (idProduct)=>{

        swal(` 
        Id Product ${idProduct}
        `)
    }


    return (
        <>
        <AdminNav></AdminNav>
            {STORE_PRODUCTS && STORE_PRODUCTS.products && STORE_PRODUCTS.products.length > 0
                ?(
                <div className="--admin-ofert-main">
                    <div className="--admin-ofert-main-col">
                        <h1>Admin Oferts</h1>
                    </div>
                    <div className="--admin-ofert-main-col">
                        {STORE_PRODUCTS.products.map((product, index)=>{
                            return  (
                            <ListProducts
                            key={index}
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            description={product.description}
                            artist={product.artist}
                            addOfert= {(id) => handleAddOfert(id)}
                            />
                            )
                        })

                        }
                    </div>
                   <div className="ofert-select">
                      
                   </div>
                   
                </div>
                ):(
                    <p>No hay Productos</p>
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
        fetchAllProductsEffect: () => dispatch(fetchAllProducts()),
        fetchAllOfertsEffect: () => dispatch(fetchAllOferts())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOferts);

