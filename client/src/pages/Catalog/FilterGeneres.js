import "./Catalog.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import { filterbyGenre } from "../../stores/products/products.actions";
import { withTranslation } from 'react-i18next';

const FilterGeneres = ({ t, categories, getProductsByGenreEffect }) => {

    const [input, setInput] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        getProductsByGenreEffect(input);
    };

    const handleGenere = (e) => { setInput(e.target.name);  };

    return (

        <form onSubmit={(e) => { handleSubmit(e) }}>

            {categories.map((category, index) => {

                if (category.name !== "") {
                    return (
                        <button key={index} name={category.name}
                            onClick={(e) => { handleGenere(e) }} 
                            className='button-filter'>
                            {category.name}
                        </button>
                    )
                }
                return "";
            })}

        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        STORE_PRODUCTS: state.productsReducers,
        filter_PRODUCTS: state.productsReducers.productFilter,
        categories: state.adminReducers.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProductsByGenreEffect: (payload) => dispatch(filterbyGenre(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FilterGeneres));
