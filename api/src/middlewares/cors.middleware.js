const server = require('express').Router();
const cors = require('cors');

server.use(cors({
  credentials: true,
  origin: process.env.FRONT_URL || "*"
}));

module.exports = server;
