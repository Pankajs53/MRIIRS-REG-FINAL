const express = require("express");
const router = express.Router();

const { searchPatient,editPrescription } = require("../controller/Doctor");

router.post("/searchPatient", searchPatient);

router.put('/editPrescription',editPrescription);

module.exports = router;
