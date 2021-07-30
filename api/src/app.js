const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session')
const routes = require('./routes/index.js');
//const emailSuscriptions = require('./routes/emailSuscriptions').sendMail()
const multer = require("./middlewares/multer.middleware");
const statics = require("./middlewares/statics.middleware");
const cors = require("./middlewares/cors.middleware");
const passport = require(".././src/middlewares/passport.middleware").server
var cron = require('node-cron');
var passport2 = require('passport')

const secureRoute = require('./routes/secureRoutes');


require('./db.js');
const { ACCESS_TOKEN_SECRET, CLIENT_URL } = process.env;


const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser(ACCESS_TOKEN_SECRET));
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CLIENT_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
server.use(session({
  secret: ACCESS_TOKEN_SECRET,
  resave: false,
  saveUninitialized: false,
}));


server.use(cors);
server.use(multer);
server.use(passport);
server.use('/', routes);
server.use("/images", statics);
server.use('/profile', passport2.authenticate('jwt', { session: false }), secureRoute);


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

cron.schedule('0 24 23 * * Tuesday', () => {
  //tuesday 23:24:00
  emailSuscriptions.sendMail()
});
module.exports = server;
