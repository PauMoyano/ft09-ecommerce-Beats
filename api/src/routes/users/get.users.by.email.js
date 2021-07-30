const server = require("express").Router();
const { getUserByEmail } = require("../../controllers/users/resetPass.users");

server.get('/:email', async (req, res, next) => {
    const { email } = req.params;
    console.log('REQ BODYYYYYYYYY',req.params)
    return await getUserByEmail(email)
     .then((user) => {
        return res.status(200).json(user)
     }).catch((error) => {
        return res.status(400).json(error.message);
    });
  })

module.exports = server;