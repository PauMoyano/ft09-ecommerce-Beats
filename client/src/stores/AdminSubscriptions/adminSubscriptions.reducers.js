import {
    GET_CUSTOMERS_REQUEST,
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_FAILURE,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    GET_PAYMENTINTENTS_REQUEST,
    GET_PAYMENTINTENTS_SUCCESS,
    GET_PAYMENTINTENTS_FAILURE,
    GET_PAYOUTS_REQUEST,
    GET_PAYOUTS_SUCCESS,
    GET_PAYOUTS_FAILURE,
    GET_SETUP_INTENTS_REQUEST,
    GET_SETUP_INTENTS_SUCCESS,
    GET_SETUP_INTENTS_FAILURE,
    GET_SUBSCRIPTIONS_REQUEST,
    GET_SUBSCRIPTIONS_SUCCESS,
    GET_SUBSCRIPTIONS_FAILURE,
    GET_INVOICES_REQUEST,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAILURE

} from './adminSubscriptions.actions';

let initialState = {
    customers:[],
    customersLoading:true,
    customersError:"",
    products:[],
    productsLoading:true,
    productsError:"",
    paymentintents:[],
    paymentintentsLoading:true,
    paymentintentsError:"",
    payouts:[],
    payoutsLoading:true,
    payoutsError:"",
    setupIntents:[],
    setupIntentsLoading:true,
    setupIntentsError:"",
    subscriptions:[],
    subscriptionsLoading:true,
    subscriptionsError:"",
    invoices:[],
    invoicesLoading:true,
    invoicesError:"",
}

const AdminSubscriptionsReducers = (state = initialState, action) =>{
    switch(action.type){
        case GET_CUSTOMERS_REQUEST:
            return {
                ...state,
                customersLoading: true
            }
        case GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customersLoading: false,
                customers: action.payload
                }
        case GET_CUSTOMERS_FAILURE:
            return {
                ...state,
                userError: action.payload,
                customersLoading: false
            }
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                productsLoading: true
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                productsLoading: false,
                products: action.payload
                }
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                productsError: action.payload,
                productsLoading: false
            }
        case GET_PAYMENTINTENTS_REQUEST:
            return {
                ...state,
                paymentintentsLoading: true
            }
        case GET_PAYMENTINTENTS_SUCCESS:
            return {
                ...state,
                paymentintentsLoading: false,
                paymentintents: action.payload
                }
        case GET_PAYMENTINTENTS_FAILURE:
            return {
                ...state,
                paymentintentsError: action.payload,
                paymentintentsLoading: false
            }
        case GET_PAYOUTS_REQUEST:
            return {
                ...state,
                payoutsLoading: true
            }
        case GET_PAYOUTS_SUCCESS:
            return {
                ...state,
                payoutsLoading: false,
                payouts: action.payload
                }
        case GET_PAYOUTS_FAILURE:
            return {
                ...state,
                payoutsError: action.payload,
                payoutsLoading: false
            }
        case GET_SETUP_INTENTS_REQUEST:
            return {
                ...state,
                setupIntentsLoading: true
            }
        case GET_SETUP_INTENTS_SUCCESS:
            return {
                ...state,
                setupIntentsLoading: false,
                setupIntents: action.payload
                }
        case GET_SETUP_INTENTS_FAILURE:
            return {
                ...state,
                setupIntentsError: action.payload,
                setupIntentsLoading: false
            }
        case GET_SUBSCRIPTIONS_REQUEST:
            return {
                ...state,
                subscriptionsLoading: true
            }
        case GET_SUBSCRIPTIONS_SUCCESS:
            return {
                ...state,
                subscriptionsLoading: false,
                subscriptions: action.payload
                }
        case GET_SUBSCRIPTIONS_FAILURE:
            return {
                ...state,
                subscriptionsError: action.payload,
                subscriptionsLoading: false
            }
        case GET_INVOICES_REQUEST:
            return {
                ...state,
                invoicesLoading: true
            }
        case GET_INVOICES_SUCCESS:
            return {
                ...state,
                invoicesLoading: false,
                invoices: action.payload
                }
        case GET_INVOICES_FAILURE:
            return {
                ...state,
                invoicesError: action.payload,
                invoicesLoading: false
            }
        default: 
        return state;
    }
}

export default AdminSubscriptionsReducers;