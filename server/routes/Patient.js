// Import the required modules
const express = require("express")
const router = express.Router()

// import controller
const {saveForm,getData} = require("../controller/Patient")


router.post("/saveForm",saveForm);
router.post("/getData",getData)

module.exports = router;