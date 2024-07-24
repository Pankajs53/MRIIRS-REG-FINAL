// Import the required modules
const express = require("express")
const router = express.Router()


const {getPatientsByCategory,getPatientCountsByCategory,getTotalUsers,getdailyUsers} = require("../controller/Admin")


router.get("/getbyCategory/:doctorCategory",getPatientsByCategory);

router.get("/categorycount",getPatientCountsByCategory);

router.get("/totalUsers",getTotalUsers);

router.get("/dailyUsers",getdailyUsers)

module.exports = router;