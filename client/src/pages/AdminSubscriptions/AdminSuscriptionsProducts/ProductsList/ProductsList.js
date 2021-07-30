import './productslist.scss';
import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { getProducts } from "../../../../stores/AdminSubscriptions/adminSubscriptions.actions";
const CustomersList = ({PRODUCTS, getProductsEffect}) =>{

    useEffect(() => {
        getProductsEffect()
    }, [getProductsEffect])

    return (
        <>
        {PRODUCTS.productsLoading
            ?(
                <p>Cargando...</p>
            ):(
                <div className="admin-productslist-main">
                <h2> Admin Products List</h2>
                {PRODUCTS.products && PRODUCTS.products.length > 0
                ?(
                    PRODUCTS.products.map((product, index)=>{
                        return (
                            <p key={index}>{product.id}</p>
                        )
                    })
                ):(
                    <h2>Not Products</h2>
                )}
            </div>
            )
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      PRODUCTS: state.AdminSubscriptionsReducers,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getProductsEffect: () => dispatch(getProducts())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CustomersList);
