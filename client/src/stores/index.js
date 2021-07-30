import { combineReducers } from "redux";
import productsReducers from "./products/products.reducers.js";
import userReducers from "./user/user.reducers.js";
import adminReducers from "./admin/admin.reducers";
import AdminSubscriptionsReducers from "./AdminSubscriptions/adminSubscriptions.reducers";
export default combineReducers({
  productsReducers,
  userReducers,
  adminReducers,
  AdminSubscriptionsReducers
});
