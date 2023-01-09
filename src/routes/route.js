const express = require('express');
const router = express.Router();
const CollegeController= require("../controllers/collegeController");
const InternController= require("../controllers/internController");

//<<<< ========== Open-to-Intern-College (Project-2) ====>>>

//--- Create College Api

router.post("/functionup/colleges", CollegeController.createCollege);

//--- Create Intern Api

router.post("/functionup/interns", InternController.createIntern);

//--- Get Intern with College Api

router.get("/functionup/collegeDetails", CollegeController.getColleges);

//API for wrong route-of-API
router.all("/*", function (req, res) {
    res.status (400).send({
    status: false,
    message: "Path Not Found"
    })
    })


    //<---- -Export router Module

    module.exports=router;