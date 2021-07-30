const { Router } = require("express");

const getProductsRouter = require("./products/get.products.js");
const postProductsRouter = require("./products/post.products.js");
const deleteProductsRouter = require("./products/delete.products.js");
const putProductsRouter = require("./products/put.products");

const getCategoriesRouter = require("./categories/get.categories");
const postCategoriesRouter = require("./categories/post.categories");
const putCategoriesRouter = require("./categories/put.categories");
const deleteCategoriesRouter = require("./categories/delete.categories");

const getCouponsRouter = require("./coupons/get.coupons");
const postCouponsRouter = require("./coupons/post.coupons");
const putCouponsRouter = require("./coupons/put.coupons");
const deleteCouponsRouter = require("./coupons/delete.coupons");


const getUserRouter = require("./users/get.users");
const postUserRouter = require("./users/post.users");
const putUserRouter = require("./users/put.users");
const deleteUserRouter = require("./users/delete.users");
const resetPassUserRouter = require("./users/resetPass.users");
const getUsersByEmail = require("./users/get.users.by.email");

const githubRouter = require("./githubRoute");
const stripeRouter = require("./stripeRoute");
const getOrder = require("./order/get.order");
const postOrder = require("./order/post.order");
const putOrder = require("./order/put.order");
const deleteOrder = require("./order/delete.order");

const getOrderLine = require("./orderline/get.orderLine");
const postOrderLine = require("./orderline/post.orderLine");
const putOrderLine = require("./orderline/put.orderLine");
const deleteOrderLine = require("./orderline/delete.orderLine");

const getComments = require("./comments/get.comments");
const postComments = require("./comments/post.comments");
const putComments = require("./comments/put.comments");
const deleteComments = require("./comments/delete.comments");

const getMessages= require("./messages/get.messages");
const postMessages = require("./messages/post.messages");
const putMessages = require("./messages/put.messages");
const deleteMessages = require("./messages/delete.messages");

const getLikesRouter = require("./likes/get.likes.js");
const postLikesRouter = require("./likes/post.likes.js");
const putLikesRouter = require("./likes/put.likes.js");
const deleteLikesRouter = require("./likes/delete.likes.js");

const promoteRouter = require("./users/promote.users.js");

const getInfoUser = require("./informationUser/get.info");
const postInfoUser = require("./informationUser/post.info");
const putInfoUser = require("./informationUser/put.info");
const deleteInfoUser = require("./informationUser/delete.info");

const getNewsletterEmailsRouter = require("./newsletter/get.newsletter");
const postNewsletterEmailsRouter = require("./newsletter/post.newsletter");
const deleteNewsletterEmailsRouter = require("./newsletter/delete.newsletter");

//STRIPE
const getCustomerRouter = require("./subscriptions/customers/get.customers");
const postCustomerRouter = require("./subscriptions/customers/post.customers");
const putCustomerRouter = require("./subscriptions/customers/put.customers");
const deleteCustomerRouter = require("./subscriptions/customers/delete.customers");

const getPaymentIntentRouter = require("./subscriptions/PaymentIntent/get.PaymentIntent");
const postPaymentIntentRouter = require("./subscriptions/PaymentIntent/post.PaymentIntent");
const putPaymentIntentRouter = require("./subscriptions/PaymentIntent/put.PaymentIntent");
const deletePaymentIntentRouter = require("./subscriptions/PaymentIntent/delete.PaymentIntent");

const getSetupIntentRouter = require("./subscriptions/SetupIntent/get.SetupIntent");
const postSetupIntentRouter = require("./subscriptions/SetupIntent/post.SetupIntent");
const putSetupIntentRouter = require("./subscriptions/SetupIntent/put.SetupIntent");
const deleteSetupIntentRouter = require("./subscriptions/SetupIntent/delete.SetupIntent");

const getDisputeRouter = require("./subscriptions/Disputes/get.dispute");
const postDisputeRouter = require("./subscriptions/Disputes/post.dispute");
const putDisputeRouter = require("./subscriptions/Disputes/put.dispute");
const deleteDisputeRouter = require("./subscriptions/Disputes/delete.dispute");

const getPayoutRouter = require("./subscriptions/Payout/get.Payout");
const postPayoutRouter = require("./subscriptions/Payout/post.Payout");
const putPayoutRouter = require("./subscriptions/Payout/put.Payout");
const deletePayoutRouter = require("./subscriptions/Payout/delete.Payout");

const getSubsProductsRouter = require("./subscriptions/Products/get.products");
const postSubsProductsRouter = require("./subscriptions/Products/post.products");
const putSubsProductsRouter = require("./subscriptions/Products/put.products");
const deleteSubsProductsRouter = require("./subscriptions/Products/delete.products");

const getSubscriptionRouter = require("./subscriptions/Subscriptions/get.subscription");
const postSubscriptionRouter = require("./subscriptions/Subscriptions/post.subscription");
const putSubscriptionRouter = require("./subscriptions/Subscriptions/put.subscription");
const deleteSubscriptionRouter = require("./subscriptions/Subscriptions/delete.subscription");

const getPricesRouter = require("./subscriptions/Prices/get.prices");
const postPricesRouter = require("./subscriptions/Prices/post.prices");
const putPricesRouter = require("./subscriptions/Prices/put.prices");
const deletePricesRouter = require("./subscriptions/Prices/delete.prices");

const getSetupAttemptstRouter = require("./subscriptions/SetupAttempts/get.SetupAttempts");

const getInvoicesRouter = require("./subscriptions/Invoices/get.invoices");
const postInvoicesRouter = require("./subscriptions/Invoices/post.invoices");
const putInvoicesRouter = require("./subscriptions/Invoices/put.invoices");
const deleteInvoicesRouter = require("./subscriptions/Invoices/delete.invoices");

const getOfertsRouter = require("./oferts/get.oferts");
const postOfertsRouter = require("./oferts/post.oferts");
const putOfertsRouter = require("./oferts/put.oferts");
const deleteOfertsRouter = require("./oferts/delete.oferts");

//#############

const router = Router();

router.use("/infouser", getInfoUser);
router.use("/infouser", postInfoUser);
router.use("/infouser", putInfoUser);
router.use("/infouser", deleteInfoUser);

router.use("/comments", getComments);
router.use("/comments", postComments);
router.use("/comments", putComments);
router.use("/comments", deleteComments);

router.use("/coupons", getCouponsRouter);
router.use("/coupons", postCouponsRouter);
router.use("/coupons", putCouponsRouter);
router.use("/coupons", deleteCouponsRouter);

router.use("/messages", getMessages);
router.use("/messages", postMessages);
router.use("/messages", putMessages);
router.use("/messages", deleteMessages);

router.use("/likes", getLikesRouter);
router.use("/likes", postLikesRouter);
router.use("/likes", putLikesRouter);
router.use("/likes", deleteLikesRouter);

router.use("/products", getProductsRouter);
router.use("/products", postProductsRouter);
router.use("/products", deleteProductsRouter);
router.use("/products", putProductsRouter);

router.use("/categories", postCategoriesRouter);
router.use("/categories", getCategoriesRouter);
router.use("/categories", putCategoriesRouter);
router.use("/categories", deleteCategoriesRouter);

router.use("/order", getOrder);
router.use("/order", postOrder);
router.use("/order", putOrder);
router.use("/order", deleteOrder);

router.use("/orderline", getOrderLine);
router.use("/orderline", postOrderLine);
router.use("/orderline", putOrderLine);
router.use("/orderline", deleteOrderLine);

router.use("/oferts", getOfertsRouter);
router.use("/oferts", postOfertsRouter);
router.use("/oferts", putOfertsRouter);
router.use("/oferts", deleteOfertsRouter);

router.use("/users", getUserRouter);
router.use("/users", postUserRouter);
router.use("/users", putUserRouter);
router.use("/users", deleteUserRouter);
router.use("/users", resetPassUserRouter);
router.use("/getname", getUsersByEmail);

router.use("/newsletter", getNewsletterEmailsRouter)
router.use("/newsletter", postNewsletterEmailsRouter)
router.use("/newsletter", deleteNewsletterEmailsRouter)

router.use("/", promoteRouter);
router.use("/", githubRouter);
router.use("/", stripeRouter);

//STRIPE
router.use("/customers", getCustomerRouter);
router.use("/customers", postCustomerRouter);
router.use("/customers", putCustomerRouter);
router.use("/customers", deleteCustomerRouter);

router.use("/paymentIntent", getPaymentIntentRouter);
router.use("/paymentIntent", postPaymentIntentRouter);
router.use("/paymentIntent", putPaymentIntentRouter);
router.use("/paymentIntent", deletePaymentIntentRouter);

router.use("/setupIntent", getSetupIntentRouter);
router.use("/setupIntent", postSetupIntentRouter);
router.use("/setupIntent", putSetupIntentRouter);
router.use("/setupIntent", deleteSetupIntentRouter);

router.use("/dispute", getDisputeRouter);
router.use("/dispute", postDisputeRouter);
router.use("/dispute", putDisputeRouter);
router.use("/dispute", deleteDisputeRouter);

router.use("/payout", getPayoutRouter);
router.use("/payout", postPayoutRouter);
router.use("/payout", putPayoutRouter);
router.use("/payout", deletePayoutRouter);

router.use("/subscriptions/products", getSubsProductsRouter);
router.use("/subscriptions/products", postSubsProductsRouter);
router.use("/subscriptions/products", putSubsProductsRouter);
router.use("/subscriptions/products", deleteSubsProductsRouter);

router.use("/subscriptions", getSubscriptionRouter);
router.use("/subscriptions", postSubscriptionRouter);
router.use("/subscriptions", putSubscriptionRouter);
router.use("/subscriptions", deleteSubscriptionRouter);

router.use("/prices", getPricesRouter);
router.use("/prices", postPricesRouter);
router.use("/prices", putPricesRouter);
router.use("/prices", deletePricesRouter);

router.use("/invoices", getInvoicesRouter);
router.use("/invoices", postInvoicesRouter);
router.use("/invoices", putInvoicesRouter);
router.use("/invoices", deleteInvoicesRouter);

router.use("/setupAttempts", getSetupAttemptstRouter);

//#############

module.exports = router;
