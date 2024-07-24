// Import the required modules
const express = require("express")
const router = express.Router()

// import controller
const userController = require("../controller/User")


router.post("/saveForm",userController.registerUser);


module.exports = router;