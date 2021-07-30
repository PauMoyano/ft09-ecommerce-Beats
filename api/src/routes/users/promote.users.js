const server = require("express").Router();
const {editUserRole} = require("../../controllers/users/promote.users");
const {protectorAdmin} = require("../../middlewares/protector.middleware");

//Promote user privilege to "admin"
server.put('/promote', (req, res, next) => {
    let {id, rol} = req.body;
    console.log(req.body)
    return editUserRole(id, rol).then(data=>{
        return res.status(200).json("User Upgrade")
    })
})

    
module.exports = server;
