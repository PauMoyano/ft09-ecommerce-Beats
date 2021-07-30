import axios from 'axios';
import { serverUrl } from '../../auxiliar/variables.js';
//GET CUSTOMERS
export const GET_CUSTOMERS_REQUEST = "GET_CUSTOMERS_REQUEST";
export const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS";
export const GET_CUSTOMERS_FAILURE = "GET_CUSTOMERS_FAILURE";
//GET PRODUCTS
export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";    
//GET PRODUCTS
export const GET_PAYMENTINTENTS_REQUEST = "GET_PAYMENTINTENTS_REQUEST";
export const GET_PAYMENTINTENTS_SUCCESS = "GET_PAYMENTINTENTS_SUCCESS";
export const GET_PAYMENTINTENTS_FAILURE = "GET_PAYMENTINTENTS_FAILURE";    
//GET PAYOUTS
export const GET_PAYOUTS_REQUEST = "GET_PAYOUTS_REQUEST";
export const GET_PAYOUTS_SUCCESS = "GET_PAYOUTS_SUCCESS";
export const GET_PAYOUTS_FAILURE = "GET_PAYOUTS_FAILURE";    
//GET SETUP INTENTS
export const GET_SETUP_INTENTS_REQUEST = "GET_SETUP_INTENTS_REQUEST";
export const GET_SETUP_INTENTS_SUCCESS = "GET_SETUP_INTENTS_SUCCESS";
export const GET_SETUP_INTENTS_FAILURE = "GET_SETUP_INTENTS_FAILURE";    
//GET SETUP SUBSCRIPTIONS
export const GET_SUBSCRIPTIONS_REQUEST = "GET_SUBSCRIPTIONS_REQUEST";
export const GET_SUBSCRIPTIONS_SUCCESS = "GET_SUBSCRIPTIONS_SUCCESS";
export const GET_SUBSCRIPTIONS_FAILURE = "GET_SUBSCRIPTIONS_FAILURE";    
//GET SETUP INVOICES
export const GET_INVOICES_REQUEST = "GET_INVOICES_REQUEST";
export const GET_INVOICES_SUCCESS = "GET_INVOICES_SUCCESS";
export const GET_INVOICES_FAILURE = "GET_INVOICES_FAILURE";    

//GET CUSTOMERS
export const getCustomers =  () => {

    return (dispatch) =>{

        dispatch(getCustomersRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/customers/`,
          };

        axios.request(options).then(customers => {
                 dispatch(getCustomersSuccess(customers.data.data));                
            }).catch(error => {
                dispatch(getCustomersFailure(error));
            });
    };
};

export const getCustomersRequest = () =>{
    return {
        type: GET_CUSTOMERS_REQUEST,
    };
}; 
export const getCustomersSuccess = (customers) =>{
    return {
        type:GET_CUSTOMERS_SUCCESS,
        payload: customers
    };
}; 
export const getCustomersFailure = (error) =>{
    return {
        type:GET_CUSTOMERS_FAILURE,
        payload: error
    };
}; 
//##############################################################
//GET PRODUCTS
export const getProducts =  () => {

    return (dispatch) =>{

        dispatch(getProductsRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/subscriptions/products`,
          };

        axios.request(options).then(products => {
                 dispatch(getProductsSuccess(products.data.data));                
            }).catch(error => {
                dispatch(getProductsFailure(error));
            });
    };
};

export const getProductsRequest = () =>{
    return {
        type: GET_PRODUCTS_REQUEST,
    };
}; 
export const getProductsSuccess = (products) =>{
    return {
        type:GET_PRODUCTS_SUCCESS,
        payload: products
    };
}; 
export const getProductsFailure = (error) =>{
    return {
        type:GET_PRODUCTS_FAILURE,
        payload: error
    };
}; 

//##############################################################
//GET paymentIntent
export const getPaymentIntent =  () => {

    return (dispatch) =>{

        dispatch(getPaymentIntentRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/subscriptions/products`,
          };

        axios.request(options).then(paymentIntents => {
                 dispatch(getPaymentIntentSuccess(paymentIntents.data.data));                
            }).catch(error => {
                dispatch(getPaymentIntentFailure(error));
            });
    };
};

export const getPaymentIntentRequest = () =>{
    return {
        type: GET_PAYMENTINTENTS_REQUEST,
    };
}; 
export const getPaymentIntentSuccess = (paymentIntents) =>{
    return {
        type:GET_PAYMENTINTENTS_SUCCESS,
        payload: paymentIntents
    };
}; 
export const getPaymentIntentFailure = (error) =>{
    return {
        type:GET_PAYMENTINTENTS_FAILURE,
        payload: error
    };
}; 
//##############################################################
//GET PAYOUTS
export const getPayouts =  () => {

    return (dispatch) =>{

        dispatch(getPayoutsRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/payout`,
          };

        axios.request(options).then(payouts => {
                 dispatch(getPayoutsSuccess(payouts.data.data));                
            }).catch(error => {
                dispatch(getPayoutsFailure(error));
            });
    };
};

export const getPayoutsRequest = () =>{
    return {
        type: GET_PAYOUTS_REQUEST,
    };
}; 
export const getPayoutsSuccess = (payouts) =>{
    return {
        type:GET_PAYOUTS_SUCCESS,
        payload: payouts
    };
}; 
export const getPayoutsFailure = (error) =>{
    return {
        type:GET_PAYOUTS_FAILURE,
        payload: error
    };
}; 

//##############################################################
//GET setupIntent
export const getSetupIntents =  () => {

    return (dispatch) =>{

        dispatch(getSetupIntentsRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/setupIntent`,
          };

        axios.request(options).then(setupIntent => {
                 dispatch(getSetupIntentsSuccess(setupIntent.data.data));                
            }).catch(error => {
                dispatch(getSetupIntentsFailure(error));
            });
    };
};

export const getSetupIntentsRequest = () =>{
    return {
        type: GET_SETUP_INTENTS_REQUEST,
    };
}; 
export const getSetupIntentsSuccess = (setupIntents) =>{
    return {
        type:GET_SETUP_INTENTS_SUCCESS,
        payload: setupIntents
    };
}; 
export const getSetupIntentsFailure = (error) =>{
    return {
        type:GET_SETUP_INTENTS_FAILURE,
        payload: error
    };
}; 
//##############################################################
//GET Subscriptions
export const getSubscriptions =  () => {

    return (dispatch) =>{

        dispatch(getSubscriptionsRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/subscriptions`,
          };

        axios.request(options).then(subscriptions => {
                 dispatch(getSubscriptionsSuccess(subscriptions.data.data));                
            }).catch(error => {
                dispatch(getSubscriptionsFailure(error));
            });
    };
};

export const getSubscriptionsRequest = () =>{
    return {
        type: GET_SUBSCRIPTIONS_REQUEST,
    };
}; 
export const getSubscriptionsSuccess = (subscriptions) =>{
    return {
        type:GET_SUBSCRIPTIONS_SUCCESS,
        payload: subscriptions
    };
}; 
export const getSubscriptionsFailure = (error) =>{
    return {
        type:GET_SUBSCRIPTIONS_FAILURE,
        payload: error
    };
}; 
//##############################################################
//GET INVOICES
export const getInvoices =  () => {

    return (dispatch) =>{

        dispatch(getInvoicesRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/invoices/`,
          };

        axios.request(options).then(invoices => {
                 dispatch(getInvoicesSuccess(invoices.data.data));                
            }).catch(error => {
                dispatch(getInvoicesFailure(error));
            });
    };
};

export const getInvoicesRequest = () =>{
    return {
        type: GET_INVOICES_REQUEST,
    };
}; 
export const getInvoicesSuccess = (invoices) =>{
    return {
        type:GET_INVOICES_SUCCESS,
        payload: invoices
    };
}; 
export const getInvoicesFailure = (error) =>{
    return {
        type:GET_INVOICES_FAILURE,
        payload: error
    };
}; 