import React, {useEffect } from 'react';
import {animated, useSpring } from "react-spring";
import { useScroll  } from "react-use-gesture"
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { fetchAllProducts } from '../../../stores/products/products.actions';
import {serverUrl} from '../../../auxiliar/variables';
import "./wrapper.css";

const Wrapper = ({fetchAllProductsEffect,  PRODUCTS, categoryName}) =>{

    const history = useHistory()
    useEffect(()=>{
        fetchAllProductsEffect()
      },[fetchAllProductsEffect]);

      const [styles, set] = useSpring(()=>({
          transform:"perspective(500px) rotateY(25deg)"
      }));

      const clamp = (value, clampAt = 30) =>{
          if(value > 0){
              return value > clampAt ? clampAt : value
          }else{
            return value < -clampAt ? -clampAt : value
          }
      };


      const bind = useScroll(event =>{
          set({
              transform:`perpective(500px) rotateY${
                  event.scrolling ? clamp(event.delta[0]) : 0
                }deg`
          })
      });

      const handleClick = (id)=>{
          history.push(`/product/${id}`)
      };

    return (
        <>
          {PRODUCTS.productLoading
            ?(  
            <div>
                <p>Cargando</p>
            </div>
            ):(
                <>
                {PRODUCTS && PRODUCTS.length > 0
                    ?(  
                        <div className='allWrapper'>
                            <div 
                            {...bind()}
                            className="wrapper">
                                {
                                    PRODUCTS.filter((product)=>{

                                        for (let i = 0; i < product.categories.length; i++) {
                                            if(categoryName === "all") return product
                                            return product.categories[i].name === categoryName
                                            
                                        }

                                        }).map((product, index)=>{
                                        let bg = `${serverUrl}/images/${product.image}`
                                        return (
                                        <animated.div 
                                        key={index}
                                        onClick={()=> handleClick(product.id)}
                                        style={ {
                                            ...styles,
                                            cursor:`pointer`,
                                            backgroundImage:`url(${bg})`,
                                            }}
                                        className="item"> 
                                        <div className='--item-detail'>
                                            <div className='--item-texto'>
                                                <p><strong>Name:</strong> {product.name.slice(0,20)}...</p>  
                                                <p>{product.description.slice(0,25)}...</p>
                                                <p><strong>Artist:</strong> {product.artist}</p>   
                                            </div>
                                        </div>
                                        
                                        
                                        </animated.div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        
                    ):(
                        <div className="load">
                    
                        </div>
                    )
                }
                </>
            )
          }
        </>
    )
}

const mapStateToProps =  state => {
    return {
      PRODUCTS : state.productsReducers.products,
    }
  }
  const mapDispatchToProps = dispatch =>{
    return {
        fetchAllProductsEffect: () => dispatch(fetchAllProducts()),

    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);