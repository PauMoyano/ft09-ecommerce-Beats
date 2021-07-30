import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {fetchAllProducts} from '../../stores/products/products.actions';
import "./ranking.scss";
import RankingItem from "./RankingItem/RankingItem";
import Spinner from "../../assets/images/Spin-1s-200px.svg"
const Ranking = ({ STORE_PRODUCTS, fetchAllProductsEffect }) => {


  window.scrollTo({
    top: 0,
    left: 0,
    behavir: 'smooth'
  });

  useEffect(() => {
    fetchAllProductsEffect()
  }, [fetchAllProductsEffect]);

  return (
    <>
        {STORE_PRODUCTS.products.Loading
            ?(
                <>
                    <div>
                        <img src={Spinner} alt="loading..."></img>
                    </div>
                </>
            ):(
                <>
                {STORE_PRODUCTS.products && STORE_PRODUCTS.products.length > 0
                 ? (
                    <main className="--ranking--main">
                    {STORE_PRODUCTS.products.sort(function (a, b) {
                            if (a.reproductions < b.reproductions) {
                                return 1;
                            }
                            if (a.reproductions > b.reproductions) {
                                return -1;
                            }
                            // a must be equal to b
                            return 0;
                            }).map((product, index)=>{
                        return (
                            <RankingItem 
                                key={index}
                                position={index}
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                image={product.image}
                                artist={product.artist}
                                reproductions={product.reproductions}
                            />
                        )
                    }) }
                    </main>
                    )
                : (
                    <p>Not Products</p>
                    )
                }
                        
                </>
            )
        }
    </>
  )
}

const mapStateToProps = state => {
  return {
    STORE_PRODUCTS: state.productsReducers,
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProductsEffect: () => {dispatch(fetchAllProducts())}
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);