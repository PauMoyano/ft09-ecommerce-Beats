import "./productswidget.scss";
import React from "react";

const ProductsWidget = ()=>{
    return (
        <>
        <div className="--products-widget-title">
            <h1>Products Live</h1>
        </div>
        <div className="--products-widget-main">
            <div className="--products-widget-main-col">
                <p>Left</p>
            </div>
            <div className="--products-widget-main-col">
                <p>Rigth</p>
            </div>
        </div>
        </>
    )
};

export default ProductsWidget