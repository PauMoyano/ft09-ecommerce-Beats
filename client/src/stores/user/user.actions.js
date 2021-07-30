import axios from 'axios';
import { serverUrl } from '../../auxiliar/variables.js';
//FETCH USER 
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
//FETCH USER BY ID
export const GET_USER_INBOX_REQUEST = "GET_USER_INBOX_REQUEST";
export const GET_USER_INBOX_SUCCESS = "GET_USER_INBOX_SUCCESS";
export const GET_USER_INBOX_FAILURE = "GET_USER_INBOX_FAILURE";
//FETCH CART 
export const GET_CART_REQUEST = "GET_CART_REQUEST";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CAR_FAILURE = "GET_CAR_FAILURE";
//ADD ITEM TO CART
export const ADD_ITEM_TO_CARD_REQUEST = "ADD_ITEM_TO_CARD_REQUEST";
export const ADD_ITEM_TO_CARD_SUCCESS = "ADD_ITEM_TO_CARD_SUCCESS";
export const ADD_ITEM_TO_CARD_FAILURE = "ADD_ITEM_TO_CARD_FAILURE";
//DELETE ITEM IN CART
export const DELETE_ITEM_CART_REQUEST = "DELETE_ITEM_CART_REQUEST";
export const DELETE_ITEM_CART_SUCCESS = "DELETE_ITEM_CART_SUCCESS";
export const DELETE_ITEM_CART_FAILURE = "DELETE_ITEM_CART_FAILURE";
//DISCOUNT
export const GET_CALCULATOR_TOTAL_PRICE = "GET_CALCULATOR_TOTAL_PRICE";
export const GET_DISCOUNT_COUPON = "GET_DISCOUNT_COUPON";
//CLEAN CART
export const CLEAN_CART = "CLEAN_CART";

//USER BY ID
export const GET_USER_ID_REQUEST = "GET_USER_ID_REQUEST";
export const GET_USER_ID_SUCCESS = "GET_USER_ID_SUCCESS";
export const GET_USER_ID_FAILURE = "GET_USER_ID_FAILURE";

//CONVERSATION
export const GET_CONVERSATION_REQUEST = "GET_CONVERSATION_REQUEST";
export const GET_CONVERSATION_SUCCESS = "GET_CONVERSATION_SUCCESS";
export const GET_CONVERSATION_FAILURE = "GET_CONVERSATION_FAILURE";

//orders by user${serverUrl}
export const GET_ORDERS_BY_USER = "GET_ORDERS_BY_USER";
//user likes
export const GET_LIKES_BY_USER = "GET_LIKES_BY_USER";

//GET ORDER BY ID CHECKOUT
export const GET_ORDER_CHECKOUT_REQUEST = "GET_ORDER_CHECKOUT_REQUEST";
export const GET_ORDER_CHECKOUT_SUCCESS = "GET_ORDER_CHECKOUT_SUCCESS";
export const GET_ORDER_CHECKOUT_FAILURE = "GET_ORDER_CHECKOUT_FAILURE";

//SEARCH USER
export const SEARCH_USER_REQUEST = "SEARCH_USER_REQUEST";
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_FAILURE = "SEARCH_USER_FAILURE";


export const getLikesByUser = (userId) => {


    return (dispatch) => {
        axios.get(`${serverUrl}/likes/user/${userId}`)
            .then(orders => {
                dispatch(likesByUser(orders.data))

            })
            .catch(error => {
                console.log(error)
            })
    }
}
export const likesByUser = (orders) => {
    return {
        type: GET_LIKES_BY_USER,
        payload: orders
    };
};
export const getOrdersByUser = (userId) => {


    return (dispatch) => {
        axios.get(`${serverUrl}/order/user/all/${userId}`)
            .then(orders => {
                dispatch(OrdersByUser(orders.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
export const OrdersByUser = (orders) => {
    return {
        type: GET_ORDERS_BY_USER,
        payload: orders
    };
};
//GET USER
export const fetchUser = () => {

    return (dispatch) => {

        dispatch(getUserRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/profile`,
            params: {
                secret_token: localStorage.getItem('token'),
                email: localStorage.getItem('email')
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        };

        axios.request(options).then(user => {
            dispatch(getUserSuccess(user));
            localStorage.setItem('localCart', "[]");
            dispatch(fetchUserInBox(user.data.user.id))
            setTimeout(() => {
                dispatch(fetchCart({ userState: true, id: user.data.user.id }));
            }, 1000);

        }).catch(error => {
            dispatch(getUserFailure(error));
            dispatch(fetchCart({ userState: false }));
        });
    };
};

export const getUserRequest = () => {
    return {
        type: GET_USER_REQUEST,
    };
};
export const getUserSuccess = (user) => {
    return {
        type: GET_USER_SUCCESS,
        payload: user
    };
};
export const getUserFailure = (error) => {
    return {
        type: GET_USER_FAILURE,
        payload: error
    };
};

//GET CART
export const fetchCart = (user) => {

    return (dispatch) => {

        if (user.userState) {

            // let LocalCart = JSON.parse(localStorage.getItem('localCart'));

            // if(LocalCart){

            //     if(LocalCart.length > 0){

            //         for (let i = 0; i < LocalCart.length; i++) {
            //             console.log("ADD TIMENTS", LocalCart[i].product )
            //             console.log("ADD ITEM USER",)
            //             return async ()=>{
            //                 await addItemToCart(user, LocalCart[i].product )
            //             }

            //         };


            //     }
            // }

            dispatch(getCartRequest());

            axios.get(`${serverUrl}/order/user/${user.id}`)
                .then(cart => {
                    dispatch(getCartSuccess(user, cart.data[0]));
                    dispatch(getCalculator())
                })
                .catch(error => {
                    dispatch(getCartFailure(error));
                })

        } else {
            let localCart = localStorage.getItem('localCart');
            if (localCart) {
                dispatch(getCartSuccess(false, JSON.parse(localCart)));
            } else {
                localStorage.setItem('localCart', "[]");
            };
            dispatch(getCalculator())
        };
    };
};

export const getCartRequest = () => {
    return {
        type: GET_CART_REQUEST,
    };
};
export const getCartSuccess = (user, cart) => {
    let obj = {
        user,
        cart
    };
    return {
        type: GET_CART_SUCCESS,
        payload: obj
    };
}
export const getCartFailure = (error) => {
    return {
        type: GET_CAR_FAILURE,
        payload: error
    };
};

//ADD ITEM TO CART
export const addItemToCart = (user, product) => {

    return (dispatch) => {

        if (user.userStatus) {

            var previusProduct = {
                productId: product.id,
                product: product,
                price: product.price,
                subtotal: 0,
                orderId: user.orderId
            };

            const options = {
                method: 'POST',
                url: `${serverUrl}/orderline/`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: previusProduct
            };

            return axios.request(options).then(function (orderLine) {
                dispatch(addItemToCartSuccess(orderLine.data));
            }).catch(function (error) {
                dispatch(getCartFailure(error));
            });

        } else {
            var auxCart = [];
            let LocalCart = JSON.parse(localStorage.getItem('localCart'));

            var previusProductAnon = {
                productId: product.id,
                product: product,
                price: product.price,
                subtotal: 0,
                orderId: "anonuser"
            };

            if (LocalCart) {

                if (LocalCart.length > 0) {

                    for (let i = 0; i < LocalCart.length; i++) {
                        auxCart.push(LocalCart[i]);
                    };

                    let repeteProduct;

                    for (let j = 0; j < auxCart.length; j++) {

                        if (auxCart[j].productId === previusProductAnon.productId) {
                            repeteProduct = true;
                        };
                    };

                    if (!repeteProduct) {
                        auxCart.push(previusProductAnon);
                        localStorage.setItem('localCart', JSON.stringify(auxCart));
                        dispatch(fetchCart(false));
                    };

                } else {
                    auxCart.push(previusProductAnon);
                    localStorage.setItem('localCart', JSON.stringify(auxCart));
                    dispatch(fetchCart(false));
                };
            };

        };
    };
};

export const addItemToCartRequest = () => {
    return {
        type: ADD_ITEM_TO_CARD_REQUEST,
    };
};
export const addItemToCartSuccess = (product) => {
    return {
        type: ADD_ITEM_TO_CARD_SUCCESS,
        payload: product
    };
};
export const addItemToCartFailure = (error) => {
    return {
        type: ADD_ITEM_TO_CARD_FAILURE,
        payload: error
    };
};

//GET CALCULATOR TOTAL PRICE
export const getCalculator = () => {
    return {
        type: GET_CALCULATOR_TOTAL_PRICE,
    };
};

//COUPON CODE----------------------------------------FALTA USER
export const getDiscountCoupon = (code, user, IdOrder) => {
    return (dispatch) => {
        return axios.get(`${serverUrl}/coupons`)
            .then((coupons) => {
                if (coupons.data.length > 0) {
                    const result = coupons.data.find((coupon) => coupon.coupon === code)
                    if (result) {
                        dispatch(getDiscountCouponAction(result));
                        dispatch(fetchProductDiscount(IdOrder,result.discount))
                        dispatch(fetchCart(user));
                    }
                }
            })
    }
}

export const getDiscountCouponAction = (code) => {
    return {
        type: GET_DISCOUNT_COUPON,
        payload: code
    };
};
//UPDATE ORDER DISCOUNT
export const fetchProductDiscount = (IdOrder, discount) => {

    return (dispatch) => {
        const options = {
            method: 'PUT',
            url: `${serverUrl}/order/discount/${IdOrder}`, 
            headers: {
                ContentType: "application/json",
            },
            data: {
                orderDiscount: discount,
            }
        };

        try {
            return axios.request(options)
        } catch {
            return console.log("Error")
        }

    }
}
//DELETE ITEM CART
export const deleteItemInCart = (orderLineId, user, idProduct) => {

    return async (dispatch) => {

        if (user.userState) {

            console.log("ORDER LINE ID", orderLineId)
            const options = {
                method: 'DELETE',
                url: `${serverUrl}/orderline/${orderLineId}`,
            };
            return await axios.request(options).then(response => {
                dispatch(fetchCart(user));
            }).catch(error => {
                dispatch(getCartFailure(error));
            })
        } else {
            var auxCart = [];
            let LocalCart = JSON.parse(localStorage.getItem('localCart'));

            if (LocalCart) {

                if (LocalCart.length > 0) {

                    for (let i = 0; i < LocalCart.length; i++) {
                        if (LocalCart[i].productId === idProduct) {
                            console.log("IGUALES", LocalCart[i].productId, " / ", idProduct);

                        } else {
                            auxCart.push(LocalCart[i]);
                        };
                    };

                    localStorage.setItem('localCart', JSON.stringify(auxCart));
                    dispatch(fetchCart(false));

                };
            };
        };
    };
};

export const deleteItemCartRequest = () => {
    return {
        type: DELETE_ITEM_CART_REQUEST,
    };
};
export const deleteItemCartSuccess = (productId, deleteAll) => {
    let obj = {
        productId,
        deleteAll
    };
    return {
        type: DELETE_ITEM_CART_SUCCESS,
        payload: obj
    };
};
export const deleteItemCartFailure = (error) => {
    return {
        type: DELETE_ITEM_CART_FAILURE,
        payload: error
    };
};

//DELETE ALL ITEM CART
export const deleteAllItemInCart = (user, orderId) => {

    return async (dispatch) => {

        if (user.userState) {
            const options = {
                method: 'DELETE',
                url: `${serverUrl}/orderline/all/${orderId}`,
            };
            return await axios.request(options).then(() => {
                dispatch(fetchCart(user));
            }).catch(error => {
                dispatch(getCartFailure(error));
            })
        } else {
            localStorage.setItem('localCart', JSON.stringify([]));
            dispatch(fetchCart(false));
        };
    };
};

//GET USER BY ID
export const fetchUserInBox = (idUser) => {

    return (dispatch) => {

        dispatch(fetchUserInBoxRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/users/${idUser}`,
            params: {
                secret_token: localStorage.getItem('token'),
                email: localStorage.getItem('email')
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        };

        axios.request(options).then(response => {
            dispatch(fetchUserInBoxSuccess(response.data.messages));
        }).catch(error => {
            dispatch(fetchUserInBoxFailure(error));
        });
    };
};

export const fetchUserInBoxRequest = () => {
    return {
        type: GET_USER_INBOX_REQUEST,
    };
};
export const fetchUserInBoxSuccess = (userInbox) => {
    return {
        type: GET_USER_INBOX_SUCCESS,
        payload: userInbox
    };
};
export const fetchUserInBoxFailure = (error) => {
    return {
        type: GET_USER_INBOX_FAILURE,
        payload: error
    };
};
export const cleanCart = () => {
    return {
        type: CLEAN_CART
    };
}

//GET USER BY ID

export const getUserById = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_USER_ID_REQUEST });
  
      const { data } = await axios.get(`${serverUrl}/users/${id}`);
      console.log(data);
  
      dispatch({
        type: GET_USER_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_ID_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  //getMessagesConversation

  export const getMessagesConversation = (idFrom, idTo) => async (dispatch) => {
    try {
      dispatch({ type: GET_CONVERSATION_REQUEST });
      
      console.log("IDTO",idTo)
      const { data } = await axios.get(`${serverUrl}/messages/${idFrom}/conversation/${idTo}`);
      
      dispatch({
        type: GET_CONVERSATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CONVERSATION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
//GET ORDER BY ID CHECKOUT
export const getOrderByCheckoutId = (orderId) => {

    return (dispatch) => {

        dispatch(getOrderByCheckoutIdRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/order/${orderId}`,
            params: {
                secret_token: localStorage.getItem('token'),
                email: localStorage.getItem('email')
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        };

        axios.request(options).then(order => {
            dispatch(getOrderByCheckoutIdSuccess(order.data));
        }).catch(error => {
            dispatch(getOrderByCheckoutIdFailure(error));
        });
    };
};

export const getOrderByCheckoutIdRequest = () => {
    return {
        type: GET_ORDER_CHECKOUT_REQUEST,
    };
};
export const getOrderByCheckoutIdSuccess = (order) => {
    return {
        type: GET_ORDER_CHECKOUT_SUCCESS,
        payload: order
    };
};
export const getOrderByCheckoutIdFailure = (error) => {
    return {
        type: GET_ORDER_CHECKOUT_FAILURE,
        payload: error
    };
};

 //SEARCHUSER

 export const searchUser = (user) => async (dispatch) => {
    try {
      dispatch({ type: SEARCH_USER_REQUEST });
      
      
      const { data } = await axios.get(`${serverUrl}/users/search/${user}`);
      
      dispatch({
        type: SEARCH_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_USER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
