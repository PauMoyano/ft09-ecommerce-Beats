const express = require("express");
const server = require("express").Router();
const path = require("path");

const options = {
  dotfiles: "ignore", //allow, deny, ignore
  etag: true,
  extensions: ["htm", "html"],
  index: false, //to disable directory indexing
  maxAge: "7d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    //add this header to all static responses
    res.set("x-timestamp", Date.now());
  },
};

server.use(express.static(path.join(__dirname, "../../uploads/"), options));


module.exports = server;