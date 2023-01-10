const interModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

//________________ validation function Imported here ___________________

const {
  isValidEmail,
  isValidMobile,
  isValid,
} = require("../validation/validation");

//======= Create Intern Data
const createIntern = async (req, res) => {
  try {
    const data = req.body;

    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, msg: "NO data provided" });

    let { name, email, mobile, collegeName } = data;

    if (data.isDeleted) {
      if (data.isDeleted != true && data.isDeleted != false)
        return res
          .status(400)
          .send({
            status: false,
            msg: "value of isDeleted should be only boolean",
          });
    }

    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Your Name" });

    if (!isValid(name.trim()))
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Valid Name" });

    if (!email)
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter your Email Id" });

    if (!isValidEmail(email.trim()))
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter a valid Email Id." });

    let existingData = await interModel.findOne({
      $or: [{ mobile: mobile }, { email: email }],
    });

    if (existingData) {
      if (existingData.email == email.trim())
        return res
          .status(400)
          .send({ status: false, msg: "email already in use" });
    }

    if (!mobile)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Your Mobile Number" });

    if (!isValidMobile(mobile.trim()))
      return res.status(400).send({
        status: false,
        message: "Mobile no. should contain only 10 digits",
      });

    if (existingData) {
      if (existingData.mobile == mobile.trim())
        return res
          .status(400)
          .send({ status: false, msg: "mobile is already in use" });
    }
    if (!collegeName)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter College Name" });

    if (!isValid(collegeName.trim()))
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Valid CollegeName" });

    let collegeData = await collegeModel.findOne({
      name: collegeName.trim(),
      isDeleted: false,
    });

    if (!collegeData)
      return res
        .status(404)
        .send({ status: false, message: "No Such College Found" });

    data.collegeId = collegeData._id.toString(); // to assign college Id in properties of data.

    let internData = await interModel.create(data);

    let newIntern = {
      isDeleted: internData.isDeleted,
      name: internData.name,
      email: internData.email,
      mobile: internData.mobile,
      collegeId: internData.collegeId,
    };

    return res.status(201).send({ status: true, data: newIntern });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

//____________________ Imported Module ________________________________
module.exports = { createIntern };
