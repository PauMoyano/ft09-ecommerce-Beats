import axios from 'axios';
import { serverUrl } from '../../auxiliar/variables.js';

//FETCH ALL PRODUCTS FROM THE SERVER WITCH THUNK
export const GET_ALL_PRODUCTS_REQUEST = "GET_ALL_PRODUCTS_REQUEST";
export const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";
export const GET_ALL_PRODUCTS_FAILURE = "GET_ALL_PRODUCTS_FAILURE";

//FETCH ONE PRODUCT FROM THE SERVER WITCH THUNK
export const GET_ONE_PRODUCT_REQUEST = "GET_ONE_PRODUCT_REQUEST";
export const GET_ONE_PRODUCT_SUCCESS = "GET_ONE_PRODUCT_SUCCESS";
export const GET_ONE_PRODUCT_FAILURE = "GET_ONE_PRODUCT_FAILURE";

//SEARCH BY NAME
export const SEARCH_PRODUCT_REQUEST = "SEARCH_PRODUCT_REQUEST";
export const SEARCH_PRODUCT_SUCCESS = "SEARCH_PRODUCT_SUCCESS";
export const SEARCH_PRODUCT_FAILURE = "SEARCH_PRODUCT_FAILURE";

//DELETE PRODUCT BY ID
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

//FETCH ALL CATEGORIES FROM THE SERVER WITH THUNK
export const GET_ALL_CATEGORIES_REQUEST = "GET_ALL_CATEGORIES_REQUEST";
export const GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_CATEGORIES_SUCCESS";
export const GET_ALL_CATEGORIES_FAILURE = "GET_ALL_CATEGORIES_FAILURE";

//FETCH ONE CATEGORY FROM THE SERVER WITH THUNK
export const PUT_ONE_CATEGORY_REQUEST = "PUT_ONE_CATEGORY_REQUEST";
export const PUT_ONE_CATEGORY_SUCCESS = "PUT_ONE_CATEGORY_SUCCESS";
export const PUT_ONE_CATEGORY_FAILURE = "PUT_ONE_CATEGORY_FAILURE";

//FETCH ONE CATEGORY FROM THE SERVER WITH THUNK
export const DELETE_CATEGORY_REQUEST = "DELETE_CATEGORY_REQUEST";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAILURE = "DELETE_CATEGORY_FAILURE";

//FETCH ALL USERS FROM THE SERVER WITH THUNK
export const GET_ALL_USERS_REQUEST = "GET_ALL_USERS_REQUEST";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_FAILURE = "GET_ALL_USERS_FAILURE";

//FETCH ALL USERS FROM THE SERVER WITH THUNK
export const GET_ALL_OFERTS_REQUEST = "GET_ALL_OFERTS_REQUEST";
export const GET_ALL_OFERTS_SUCCESS = "GET_ALL_OFERTS_SUCCESS";
export const GET_ALL_OFERTS_FAILURE = "GET_ALL_OFERTS_FAILURE";

//fetch all orders
export const GET_ALL_ORDERS_REQUEST = "GET_ALL_ORDERS_REQUEST";
export const GET_ALL_ORDERS_SUCCESS = "GET_ALL_ORDERS_SUCCESS";
export const GET_ALL_ORDERS_FAILURE = "GET_ALL_ORDERS_FAILURE";

//delete order by id
export const DELETE_ORDER_BY_ID = "DELETE_ORDER_BY_ID";
//filter order by status
export const FILTER_ORDER_BY_STATUS = "FILTER_ORDER_BY_STATUS";
export function filterOrderByStatus(status) {
    return { type: FILTER_ORDER_BY_STATUS, payload: status }
}
export const deleteOrderById = (id) => {

    return (dispatch) => {
        axios.delete(`${serverUrl}/order/${id}`)
            .then(products => {
                dispatch({
                    type: DELETE_ORDER_BY_ID
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
}
export const fetchAllOrders = () => {

    return (dispatch) => {
        dispatch(fetchAllOrdersRequest())
        axios.get(`${serverUrl}/order/`)
            .then(orders => {
                dispatch(fetchAllOrdersSuccess(orders.data))
            })
            .catch(error => {
                dispatch(fetchAllOrdersFailure())
            })
    }
}
export const fetchAllOrdersRequest = () => {
    return {
        type: GET_ALL_ORDERS_REQUEST,
    }
}
export const fetchAllOrdersSuccess = (orders) => {
    return {
        type: GET_ALL_ORDERS_SUCCESS,
        payload: orders
    }
}
export const fetchAllOrdersFailure = (error) => {
    return {
        type: GET_ALL_ORDERS_FAILURE,
        payload: error
    }
}
//
export const fetchAllProducts = () => {

    return (dispatch) => {
        dispatch(getAllProductsRequest())
        axios.get(`${serverUrl}/products/`)
            .then(products => {
                dispatch(getAllProductsSuccess(products.data))
            })
            .catch(error => {
                dispatch(getAllProductsFailure(error))
            })
    }
}

export const getAllProductsRequest = () => {
    return {
        type: GET_ALL_PRODUCTS_REQUEST,
    }
}
export const getAllProductsSuccess = (products) => {
    return {
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: products
    }
}
export const getAllProductsFailure = (error) => {
    return {
        type: GET_ALL_PRODUCTS_FAILURE,
        payload: error
    }
}

//FETCH ALL USERS
export const fetchAllUsers = () => {

    return (dispatch) => {
        dispatch(getAllUsersRequest())
        const options = {
            method: 'GET',
            url: `${serverUrl}/users/`,
            headers: {
                ContentType: "application/json",
                token: localStorage.getItem("token")
            }
        };
        axios.request(options).then(users => {
            dispatch(getAllUsersSuccess(users.data))
        })
            .catch(error => {
                dispatch(getAllUsersFailure(error))
            })
    }
}

export const getAllUsersRequest = () => {
    return {
        type: GET_ALL_USERS_REQUEST,
    }
}
export const getAllUsersSuccess = (users) => {
    return {
        type: GET_ALL_USERS_SUCCESS,
        payload: users
    }
}
export const getAllUsersFailure = (error) => {
    return {
        type: GET_ALL_USERS_FAILURE,
        payload: error
    }
}

//DELETE PRODUCT
export const deleteProducts = (id) => {
    return (dispatch) => {
        dispatch(deleteProductsRequest())
        fetch(`${serverUrl}/products/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        })
            .then(res => dispatch(deleteProductsSuccess()))
            .catch(error => {
                dispatch(deleteProductsFailure(error))
            })
    }
}

export const deleteProductsRequest = () => {
    return {
        type: DELETE_PRODUCT_REQUEST,
    }
}
export const deleteProductsSuccess = () => {
    return {
        type: DELETE_PRODUCT_SUCCESS,
    }
}
export const deleteProductsFailure = (error) => {
    return {
        type: DELETE_PRODUCT_FAILURE,
        payload: error
    }
}

//FETCH PRODUCT BY ID
export const fetchOneProduct = (productId) => {

    return (dispatch) => {
        dispatch(getOneProductRequest())
        axios.get(`${serverUrl}/products/${productId}`)
            .then(product => {
                dispatch(getOneProductSuccess(product.data))
            })
            .catch(error => {
                dispatch(getOneProductFailure(error))
            })
    }
}

export const getOneProductRequest = () => {
    return {
        type: GET_ONE_PRODUCT_REQUEST,
    }
}
export const getOneProductSuccess = (product) => {
    return {
        type: GET_ONE_PRODUCT_SUCCESS,
        payload: product
    }
}
export const getOneProductFailure = (error) => {
    return {
        type: GET_ONE_PRODUCT_FAILURE,
        payload: error
    }
}

//fetch Categories
export const fetchAllCategories = () => {

    return (dispatch) => {
        dispatch(fetchAllCategoriesRequest())
        axios.get(`${serverUrl}/categories/`)
            .then(categories => {
                dispatch(fetchAllCategoriesSuccess(categories.data))
            })
            .catch(error => {
                dispatch(fetchAllCategoriesFailure(error))
            })
    }
}

export const fetchAllCategoriesRequest = () => {
    return {
        type: GET_ALL_CATEGORIES_REQUEST,
    }
}
export const fetchAllCategoriesSuccess = (categories) => {
    return {
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: categories
    }
}
export const fetchAllCategoriesFailure = (error) => {
    return {
        type: GET_ALL_CATEGORIES_FAILURE,
        payload: error
    }
}

//fetch Categories
export const putCategoryById = (idCat, category) => {

    return (dispatch) => {
        console.log(category)
        dispatch(putCategoryByIdRequest())
        const options = {
            method: 'PUT',
            url: `${serverUrl}/categories/${idCat}`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            data: category
        };

        axios.request(options)
            .then(category => {
                dispatch(putCategoryByIdSuccess(category.data))
            })
            .catch(error => {
                dispatch(putCategoryByIdFailure(error))
            })
    }
}

export const putCategoryByIdRequest = () => {
    return {
        type: PUT_ONE_CATEGORY_REQUEST,
    }
}
export const putCategoryByIdSuccess = (category) => {
    return {
        type: PUT_ONE_CATEGORY_SUCCESS,
        payload: category
    }
}
export const putCategoryByIdFailure = (error) => {
    return {
        type: PUT_ONE_CATEGORY_FAILURE,
        payload: error
    }
}

//DELETE CATEGORY
export const deleteCategory = (id) => {
    return (dispatch) => {
        dispatch(deleteCategoryRequest())
        fetch(`${serverUrl}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        })
            .then(res => {
                dispatch(deleteCategorySuccess())
                dispatch(fetchAllCategories())
            })
            .catch(error => {
                dispatch(deleteCategoryFailure(error))
            })
    }
}

export const deleteCategoryRequest = () => {
    return {
        type: DELETE_CATEGORY_REQUEST,
    }
}
export const deleteCategorySuccess = () => {
    return {
        type: DELETE_CATEGORY_SUCCESS,
    }
}
export const deleteCategoryFailure = (error) => {
    return {
        type: DELETE_CATEGORY_FAILURE,
        payload: error
    }
}

//ADMIN DashBoar

export const fetchAllOferts = () => {

    return (dispatch) => {
        dispatch(fetchAllOfertsRequest())
        axios.get(`${serverUrl}/oferts/`)
            .then(oferts => {
                dispatch(fetchAllOfertsSuccess(oferts.data))
            })
            .catch(error => {
                dispatch(fetchAllOfertsFailure(error))
            })
    }
}

export const fetchAllOfertsRequest = () => {
    return {
        type: GET_ALL_OFERTS_REQUEST,
    }
}
export const fetchAllOfertsSuccess = (oferts) => {
    return {
        type: GET_ALL_OFERTS_SUCCESS,
        payload: oferts
    }
}
export const fetchAllOfertsFailure = (error) => {
    return {
        type: GET_ALL_OFERTS_FAILURE,
        payload: error
    }
}

