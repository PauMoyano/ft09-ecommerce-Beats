import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ONE_PRODUCT_REQUEST,
  GET_ONE_PRODUCT_SUCCESS,
  GET_ONE_PRODUCT_FAILURE,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAILURE,
  SEARCH_PRODUCT_REQUEST,
} from "../products/products.actions";
import {
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  PUT_ONE_CATEGORY_REQUEST,
  PUT_ONE_CATEGORY_SUCCESS,
  PUT_ONE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  DELETE_ORDER_BY_ID,
  FILTER_ORDER_BY_STATUS,
  GET_ALL_OFERTS_REQUEST,
  GET_ALL_OFERTS_SUCCESS,
  GET_ALL_OFERTS_FAILURE
} from "../admin/admin.actions";

let initialState = {
  products: [],
  productsLoading: true,
  productsError: "",
  product: {},
  productLoading: true,
  productError: "",
  searchResults: [],
  searchLoading: true,
  searchError: "",
  deleteProductError: "",
  deleteProductLoading: true,
  categories: [],
  categoriesError: "",
  categoriesLoading: true,
  category: {},
  categoryLoading: true,
  categoryError: "",
  users: [],
  usersLoading: true,
  usersError: "",
  ordersLoading:true,
  orders: [],
  ordersError:"",
  ordersFiltered: [],
  oferts: [],
  ofertsLoading: true,
  ofertsError: "",
};

const adminReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_OFERTS_REQUEST:
      return {
        ...state,
        ofertsLoading: true,
      };
    case GET_ALL_OFERTS_SUCCESS:
      return {
        ...state,
        ofertsError: false,
        oferts: action.payload,
      };
    case GET_ALL_OFERTS_FAILURE:
      return {
        ...state,
        ofertsError: "error 404",
        ofertsLoading: false,
      };
    case FILTER_ORDER_BY_STATUS:
      let filtered = state.orders.filter(order => {
        return order.orderStatus == action.payload
      })
      return {
        ...state,
        ordersFiltered: filtered
      }
    case DELETE_ORDER_BY_ID:
      return {
        ...state
      }
    case GET_ALL_ORDERS_REQUEST:
        return {
          ...state,
          ordersLoading: true,
        };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        ordersLoading:false,
        orders: action.payload,
        ordersFiltered: action.payload

      }
      case GET_ALL_ORDERS_FAILURE:
        return {
          ...state,
          ordersError: "error 404",
          ordersLoading: false,
        };
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        usersLoading: true,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        users: action.payload,
      };
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        usersError: "error 404",
        usersLoading: false,
      };
    case GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        usersLoading: true,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        products: action.payload,
      };
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        productsError: "error 404",
        productsLoading: false,
      };
    case GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        categoriesLoading: true,
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesLoading: false,
        categories: action.payload,
      };
    case GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        categoriesError: "error 404",
        categoriesLoading: false,
      };
    case PUT_ONE_CATEGORY_REQUEST:
      return {
        ...state,
        categoryLoading: true,
      };
    case PUT_ONE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryLoading: false,
        category: action.payload,
      };
    case PUT_ONE_CATEGORY_FAILURE:
      return {
        ...state,
        categoryError: "error 404",
        categoryLoading: false,
      };
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        deleteProductLoading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteProductLoading: false,
      };
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        deleteCategoryError: "error 404",
        deleteCategoryLoading: false,
      };
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        deleteCategoryLoading: true,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteCategoryLoading: false,
      };
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        deleteProductError: "error 404",
        deleteProductLoading: false,
      };
    case GET_ONE_PRODUCT_REQUEST:
      return {
        ...state,
        productLoading: true,
      };
    case GET_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        productLoading: false,
        product: action.payload,
      };
    case GET_ONE_PRODUCT_FAILURE:
      return {
        ...state,
        productError: "error 404",
        productLoading: false,
      };
    case SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        searchLoading: true,
      };
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchResults: action.payload,
      };
    case SEARCH_PRODUCT_FAILURE:
      return {
        ...state,
        searchError: "error 404",
        searchLoading: false,
      };
    default:
      return state;
  }
};

export default adminReducers;
