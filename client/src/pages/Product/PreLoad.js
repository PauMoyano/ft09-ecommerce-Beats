import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOneProduct } from "../../stores/products/products.actions";
import { useParams } from "react-router-dom";

//Internationalization
import { withTranslation } from 'react-i18next';

const PreLoad = ({ fetchOneProductEffect }) => {


    const { productId } = useParams();
    useEffect(() => {
        fetchOneProductEffect(productId)

    }, [productId, fetchOneProductEffect]);


    return (

        <></>

    );
};

const mapStateToProps = (state) => {
    return {
        product: state.productsReducers.product


    };
};
const mapDispatchToProps = (dispatch) => {
    return {

        fetchOneProductEffect: (productId) => dispatch(fetchOneProduct(productId)),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PreLoad));
