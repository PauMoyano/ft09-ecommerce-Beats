import "./Catalog.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProductsByCategories, filterbyGenre, fetchAllProducts } from "../../stores/products/products.actions";
import CatalogCard from "../../components/Catalog/CatalogCard";
import { fetchAllCategories } from '../../stores/admin/admin.actions';
import FilterGeneres from "./FilterGeneres";
import { withTranslation } from 'react-i18next';

const Catalog = ({ t, fetchAllProductsEffect, getCategoriesEffect, filter_PRODUCTS }) => {

  useEffect(() => {
    fetchAllProductsEffect();
    getCategoriesEffect();
  }, [fetchAllProductsEffect, getCategoriesEffect]);

  const handleClick = (e) => {
    e.preventDefault()
    return fetchAllProductsEffect()
  }

  return (
    <main className="catalog--main">
      <div className="catalog--main-row">
        <div className="catalog--main-col-menu-box">
            <h2>{t("page.catalog.title")}</h2>
            <button onClick={handleClick} className='button-filter'>All generes</button>
            <FilterGeneres />
        </div>
        <div className="catalog--main-col">
          {filter_PRODUCTS && filter_PRODUCTS.length >= 1 ? (
            filter_PRODUCTS.map((product, index) => {
              return (
                <CatalogCard
                  key={index}
                  id={product.id}
                  name={product.name}
                  autor={product.artist}
                  image={product.image}
                  price={product.price}
                  product={product}
                />
              );
            })
          ) : (
            <p>NO PRODUCTS IN DB</p>
          )}
        </div>
        
      </div>
      
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    STORE_PRODUCTS: state.productsReducers,
    filter_PRODUCTS: state.productsReducers.productFilter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProductsEffect: () => dispatch(fetchAllProducts()),
    getProductsByCategoriesEffect: (payload) => dispatch(getProductsByCategories(payload)),
    getProductsByGenreEffect: (payload) => dispatch(filterbyGenre(payload)),
    getCategoriesEffect: () => dispatch(fetchAllCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Catalog));
