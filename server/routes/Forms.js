const express = require("express");
const router = express.Router();

const { getAllUsers,getFormData,editFormData,getUser } = require("../controller/Forms");

router.get("/getAllUsers", getAllUsers);

router.post("/getFormData", getFormData);


router.post("/editFormData",editFormData)

router.post("/findUser",getUser)




module.exports = router;
