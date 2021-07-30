import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CAR_FAILURE,
    ADD_ITEM_TO_CARD_REQUEST,
    ADD_ITEM_TO_CARD_SUCCESS,
    ADD_ITEM_TO_CARD_FAILURE,
    DELETE_ITEM_CART_REQUEST,
    DELETE_ITEM_CART_SUCCESS,
    DELETE_ITEM_CART_FAILURE,
    GET_CALCULATOR_TOTAL_PRICE,
    GET_DISCOUNT_COUPON,
    GET_ORDERS_BY_USER,
    GET_USER_INBOX_REQUEST,
    GET_USER_INBOX_SUCCESS,
    GET_USER_INBOX_FAILURE,
    CLEAN_CART,
    GET_LIKES_BY_USER,
    GET_USER_ID_REQUEST,
    GET_USER_ID_SUCCESS,
    GET_USER_ID_FAILURE,
    GET_CONVERSATION_REQUEST,
    GET_CONVERSATION_SUCCESS,
    GET_CONVERSATION_FAILURE,
    GET_ORDER_CHECKOUT_REQUEST,
    GET_ORDER_CHECKOUT_SUCCESS,
    GET_ORDER_CHECKOUT_FAILURE,
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAILURE,
} from './user.actions';

let initialState = {
    user: [],
    userLoading: true,
    userError: "",
    searchResultsUser: [],
    searchLoading: true,
    searchError: "",
    cart: [],
    cartDetaills: "",
    totalPrice: 0,
    subTotalPrice: 0,
    discountPrice: 0,
    coupon: 0,
    cartLoading: true,
    cartError: "",
    orders: [],
    userInBox: [],
    userInBoxLoading: true,
    userInBoxError: "",
    userLikes:[],
    userPublic:[],
    userPublicLoading:true,
    userPublicError:"",
    conversation:[],
    conversationLoading:true,
    conversationError:"",
    orderCheckout:{},
    orderCheckoutLoading:true,
    orderCheckoutError:"",
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_USER_REQUEST:
            return {
                ...state,
                searchLoading: true
            }
        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                searchLoading: false,
                searchResultsUser: action.payload
            }
        case SEARCH_USER_FAILURE:
            return {
                ...state,
                searchError: 'error 404',
                searchLoading: false
            }
        case GET_CONVERSATION_REQUEST:
            return {
                ...state,
                conversationLoading: true
            }
        case GET_CONVERSATION_SUCCESS:
            return {
                ...state,
                conversationLoading: false,
                conversation: action.payload
            }
        case GET_CONVERSATION_FAILURE:
            return {
                ...state,
                conversationLoading: false,
                conversationError: action.payload
            }
        case GET_USER_ID_REQUEST:
            return {
                ...state,
                userPublicLoading: true
            }
        case GET_USER_ID_SUCCESS:
            return {
                ...state,
                userPublicLoading: false,
                userPublic: action.payload
            }
        case GET_USER_ID_FAILURE:
            return {
                ...state,
                userPublicLoading: false,
                userPublicError: action.payload
            }
        case GET_USER_ID_REQUEST:
            return {
                ...state,
                userPublicLoading: true
            }
        case GET_USER_ID_SUCCESS:
            return {
                ...state,
                userPublicLoading: false,
                userPublic: action.payload
            }
        case GET_USER_ID_FAILURE:
            return {
                ...state,
                userPublicLoading: false,
                userPublicError: action.payload
            }
        case GET_ORDER_CHECKOUT_REQUEST:
            return {
                ...state,
                orderCheckoutLoading: true
            }
        case GET_ORDER_CHECKOUT_SUCCESS:
            return {
                ...state,
                orderCheckoutLoading: false,
                orderCheckout: action.payload
            }
        case GET_ORDER_CHECKOUT_FAILURE:
            return {
                ...state,
                orderCheckoutLoading: false,
                orderCheckoutError: action.payload
            }
        case GET_LIKES_BY_USER:
            return {
                ...state,
                userLikes:action.payload
            }
        case GET_USER_INBOX_REQUEST:
            return {
                ...state,
                userInBoxLoading: true
            }
        case GET_USER_INBOX_SUCCESS:
            return {
                ...state,
                userInBoxLoading: false,
                userInBox: action.payload
            }
        case GET_USER_INBOX_FAILURE:
            return {
                ...state,
                userInBoxLoading: false,
                userInBoxError: action.payload
            }
        case CLEAN_CART:
            return {
                ...state,
                cart: []
            }

        case GET_ORDERS_BY_USER:
            return {
                ...state,
                orders: action.payload
            }
        case GET_USER_REQUEST:
            return {
                ...state,
                userLoading: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: action.payload
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                userError: action.payload,
                userLoading: false
            }
        case GET_CART_REQUEST:
            return {
                ...state,
                cartLoading: true
            }
        case GET_CART_SUCCESS:
            if (action.payload.user.userState) {
                return {
                    ...state,
                    cartLoading: false,
                    cartDetaills: action.payload.cart,
                    cart: action.payload.cart.orderLines
                }
            } else {
                return {
                    ...state,
                    cartLoading: false,
                    cartDetaills: action.payload.cart,
                    cart: action.payload.cart
                }
            }
        case GET_CAR_FAILURE:
            return {
                ...state,
                cartError: action.payload,
                cartLoading: false,

            }
        case ADD_ITEM_TO_CARD_REQUEST:
            return {
                ...state,
                cartLoading: true
            }
        case ADD_ITEM_TO_CARD_SUCCESS:
            var aux = []
            if (state.cart.length > 0) {

                for (let i = 0; i < state.cart.length; i++) {
                    if (state.cart[i].id === action.payload.id) {
                        return {
                            ...state,
                            cartLoading: false,
                        }
                    } else {
                        aux.push(action.payload)
                    }
                }
                return {
                    ...state,
                    cartLoading: false,
                    cart: [...state.cart, aux[0]]
                }
            } else {
                return {
                    ...state,
                    cartLoading: false,
                    cart: [...state.cart, action.payload]
                }
            }

        case ADD_ITEM_TO_CARD_FAILURE:
            return {
                ...state,
                cartError: action.payload,
                cartLoading: false
            }
        case GET_CALCULATOR_TOTAL_PRICE:
            var total = 0;
            if (state.cart.length > 0) {
                for (let i = 0; i < state.cart.length; i++) {
                    total = total + parseInt(state.cart[i].product.price)
                }
            }
            return {
                ...state,
                totalPrice: (total - state.coupon) < 0 ? 0 : (total - state.coupon),
                subtotalPrice: total
            }
        case GET_DISCOUNT_COUPON:
            if(action.payload){
                return {
                    ...state,
                    coupon: action.payload.discount
                }
            }
            return state
        case DELETE_ITEM_CART_REQUEST:
            return {
                ...state,
                cartLoading: true
            }
        case DELETE_ITEM_CART_SUCCESS:

            if (action.payload.deleteAll) {
                return {
                    ...state,
                    cartLoading: false,
                    cart: [],
                    totalPrice: 0,
                    coupon: 0
                }
            } else {
                return {
                    ...state,
                    cartLoading: false,
                    cart: state.cart.filter((product) => {
                        return product.id !== action.payload.productId
                    }),
                    coupon: state.cart.length < 2 ? 0 : state.coupon
                }

            }

        case DELETE_ITEM_CART_FAILURE:
            return {
                ...state,
                cartError: action.payload,
                cartLoading: false
            }
        default:
            return state;
    }
}

export default userReducers;