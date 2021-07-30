import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Layouts
import {
  PagesLayout,
  HomeLayout,
  LoginLayout,
  AdminLayout,
  ProductLayout,
  AdminSubscriptionsLayout,
  ProfileLayout,
  PrintLayout
} from "./Layouts/Layouts";

//Pages
import Home from "./pages/Home/Home.js";
import Product from "./pages/Product/Product.js";
import Catalog from "./pages/Catalog/Catalog.js";
import Form from "./pages/Admin/AdminProducts/AddProduct";
import PutForm from "./pages/Admin/AdminProducts/EditProduct";
import Categories from "./pages/Admin/AdminCategories/AddCategories";
import Login from "./pages/Auth/Login/Login.js";
import Register from "./pages/Auth/Register/Register";
import Results from "./pages/Home/Results/Results.js";
import Cart from "./pages/Cart/Cart";
import EditCategories from './pages/Admin/AdminCategories/EditCategories';
import Admin from './pages/Admin/Admin';

import AdminOferts from './pages/Admin/AdminOferts/AdminOferts';
import ListOferts from './pages/Admin/AdminOferts/ListOferts/ListOferts';

import AdminAddOferts from './pages/Admin/AdminOferts/AddOferts/AddOferts';
import AdminListUsers from './pages/Admin/AdminListUsers/AdminListUsers';
import ProductList from './pages/Admin/AdminProducts/ListProducts';
import Profile from './pages/Auth/Profile/Profile'
import LoginGithub from './pages/Auth/Login/LoginGithub'
import ListCategories from "./pages/Admin/AdminCategories/ListCategories";
import './pages/Admin/AdminProducts/listProduct.css';
import ResetPass from './components/LoginCard/ResetPass/ResetPass';
import InsCode from './components/LoginCard/ResetPass/InsCode';
import Checkout from "./pages/Checkout/Checkout";
import CheckoutPay from './pages/CheckoutPay/CheckoutPay';
import PublicProfile from './components/PublicProfile/PublicProfile';


import EditOrders from "./pages/Admin/AdminOrders/EditOrder"
//Menu Routes
import Oferts from "./pages/Oferts/Oferts";
import Ranking from "./pages/Ranking/Ranking";

//User Routes
import Messages from "./pages/Messages/Messages";
import EditUserProfile from "./pages/Auth/Profile/EditUserProfile/EditUserProfile";

import ListOrder from './pages/Admin/AdminOrders/ListOrder';
import OrderDetails from "./components/Profile/OrderDetails/OrderDetails";


//Subscriptions
import AdminSubscriptions from './pages/AdminSubscriptions/AdminSubscriptions';
import Payouts from './pages/AdminSubscriptions/Payouts/Payouts';
import Customers from './pages/AdminSubscriptions/Customers/Customers';
import PaymentIntents from './pages/AdminSubscriptions/PaymentIntents/Paymentintents';
import SetupAttempts from './pages/AdminSubscriptions/SetupAttempts/Setupattempts';
import SetupIntents from './pages/AdminSubscriptions/SetupIntents/SetupIntents';
import Subscriptions from './pages/AdminSubscriptions/Subscriptions/Subscriptions';
import Prices from './pages/AdminSubscriptions/Prices/Prices';
import Invoices from './pages/AdminSubscriptions/Invoices/Invoices';
import SuscriptionsProducts from './pages/AdminSubscriptions/AdminSuscriptionsProducts/AdminSuscriptionsProducts';
import CheckoutCart from "./components/Cart/CheckoutCart/CheckoutCart";
import AddCoupons from "./pages/Admin/AdminCoupons/AddCoupons/AddCoupons";
import ListCoupons from "./pages/Admin/AdminCoupons/ListCoupon/ListCoupons";


const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <RouteWrapper exact path="/" component={Home} layout={HomeLayout} />
        <RouteWrapper exact path="/catalog" component={Catalog} layout={PagesLayout}/>
        <RouteWrapper exact path="/product/:productId" component={Product} layout={ProductLayout}/>
        <RouteWrapper exact path="/payment" component={CheckoutPay} layout={CheckoutPay} />
        <RouteWrapper exact path="/admin/listproducts" component={ProductList} layout={AdminLayout} />
        <RouteWrapper exact path="/listcat" component={ListCategories} layout={AdminLayout} />
        <RouteWrapper exact path="/editCat/:idCat/:name/:description" component={EditCategories} layout={AdminLayout} />
        <RouteWrapper exact path="/add" component={Form} layout={AdminLayout} />
        <RouteWrapper exact path="/admin" component={Admin} layout={AdminLayout} />
        <RouteWrapper exact path="/admin/ListUsers" component={AdminListUsers} layout={AdminLayout} />
        <RouteWrapper exact path="/admin/listorders" component={ListOrder} layout={AdminLayout} />
        <RouteWrapper path="/admin/listorders/:id" component={EditOrders} layout={AdminLayout} />
        <RouteWrapper exact path="/admin/products/edit/:idProducts" component={PutForm} layout={PagesLayout} />
        <RouteWrapper exact path="/addCategories" component={Categories} layout={AdminLayout} />
        <RouteWrapper exact path="/login" component={Login} layout={LoginLayout} />
        <RouteWrapper exact path="/results/:name" component={Results} layout={PagesLayout} />
        <RouteWrapper exact path="/register" component={Register} layout={LoginLayout} />
        <RouteWrapper exact path="/resetpass" component={ResetPass} layout={LoginLayout} />
        <RouteWrapper exact path="/inscode" component={InsCode} layout={LoginLayout} />
        <RouteWrapper exact path="/cart" component={Cart} layout={PagesLayout} />
        <RouteWrapper exact path="/profile" component={Profile} layout={ProfileLayout} />
        <RouteWrapper exact path="/profile/edit" component={EditUserProfile} layout={ProfileLayout} />
        <RouteWrapper path="/profile/order/:id" component={OrderDetails} layout={PagesLayout} />
        <RouteWrapper exact path="/login/github/:email/:password" component={LoginGithub} layout={PagesLayout} />
        <RouteWrapper exact path="/checkout" component={Checkout} layout={PagesLayout}/>
        <RouteWrapper exact path="/oferts" component={Oferts} layout={PagesLayout} />
        <RouteWrapper exact path="/ranking" component={Ranking} layout={PagesLayout} />
        <RouteWrapper exact path="/admin/oferts" component={AdminOferts} layout={AdminLayout} />
        <RouteWrapper exact path="/admin/oferts/listoferts" component={ListOferts} layout={AdminLayout} />
        <RouteWrapper exact path="/admin/coupons/add" component={AddCoupons} layout={AdminLayout} />
        <RouteWrapper exact path="/admin/coupons/list" component={ListCoupons} layout={AdminLayout} />
        <RouteWrapper exact path="/admin/oferts/add/:idProduct" component={AdminAddOferts} layout={AdminLayout} />
        <RouteWrapper exact path="/adminsubscriptions" component={AdminSubscriptions} layout={AdminSubscriptionsLayout} />
        <RouteWrapper exact path="/adminsuscriptions/customers" component={Customers} layout={AdminSubscriptionsLayout} />
        <RouteWrapper exact path="/adminsuscriptions/products" component={SuscriptionsProducts} layout={AdminSubscriptionsLayout} />
        <RouteWrapper exact path="/adminsuscriptions/paymentintests" component={PaymentIntents} layout={AdminSubscriptionsLayout} />
        <RouteWrapper exact path="/adminsuscriptions/payouts" component={Payouts} layout={AdminSubscriptionsLayout} />
        <RouteWrapper exact path="/adminsuscriptions/setupAttempts" component={SetupAttempts} layout={AdminSubscriptionsLayout} />
        <RouteWrapper exact path="/adminsuscriptions/setupIntets" component={SetupIntents} layout={AdminSubscriptionsLayout} />
        <RouteWrapper exact path="/adminsuscriptions/subscriptions" component={Subscriptions} layout={AdminSubscriptionsLayout} />
        <RouteWrapper exact path="/adminsuscriptions/prices" component={Prices} layout={AdminSubscriptionsLayout} />
        <RouteWrapper exact path="/adminsuscriptions/invoices" component={Invoices} layout={AdminSubscriptionsLayout} />
        <RouteWrapper exact path="/profile/messages" component={Messages} layout={PagesLayout} />
        <RouteWrapper exact path="/publicProfile/:idUser" component={PublicProfile} layout={PagesLayout} />

        <RouteWrapper exact path="/checkout/order/:orderId" component={CheckoutCart} layout={PrintLayout}/>
      </Switch>
    </BrowserRouter>
  );
};
function RouteWrapper({ component: Component, layout: Layout, ...rest }) {


  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
export default App;
