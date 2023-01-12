const CollegeModel = require("../models/collegeModel");
const InternModel = require("../models/internModel");

const {
  isValid,
  isValidfullName,
  isValidUrl,
} = require("../validation/validation");

const createCollege = async function (req, res) {
  try {
    let data = req.body;
    const { name, fullName, logoLink } = data; 

    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, msg: "NO data provided" });
    //name
    if (!name) return res.status(400).send({ msg: "name is required" });

    if (!isValid(name.trim())) {
      return res.status(400).send({ status: false, msg: "Name is not valid" });
    }
    //duplicateName
    let duplicateName = await CollegeModel.findOne({ name: name });
    if (duplicateName) {
      return res.status(400).send({
        status: false,
        msg: "Can't create newcollege. College name already exist",
      });
    }
    if (!fullName) return res.status(400).send({status: false, msg: "fullName is required" });

    if (!isValidfullName(fullName.trim())) {
      return res
        .status(400)
        .send({ status: false, msg: "full name is not valid" });
    }

    if (!logoLink) return res.status(400).send({status: false, msg: "logoLink is required" });

    if (!isValidUrl(logoLink.trim())) {
      return res.status(400).send({
        status: false,
        message: "logolink is invalid , please enter valid logolink",
      });
    }

    if (data.isDeleted) {
      if (data.isDeleted != false && data.isDeleted != true)
        return res
          .status(400)
          .send({
            status: false,
            msg: "value of isDeleted should be only boolean",
          });
    }

    const newCollege = await CollegeModel.create(data);

    const Collegeres = {
      name: newCollege.name,
      fullName: newCollege.fullName,
      logoLink: newCollege.logoLink,
      isDeleted: newCollege.isDeleted,
    };

    return res.status(201).send({ status: true, msg: Collegeres });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
};

//========= ============== Get Interns Data with College Details ================ =============>>>
const getColleges = async (req, res) => {
  try {
    let collegeName = req.query.collegeName;
    if (!collegeName) {
      return res
        .status(400)
        .send({ status: false, message: "Please Enter  College Name" });
    }
    collegeName = collegeName.trim();

    const dataFromCollege = await CollegeModel.findOne({
      name: collegeName,
      isDeleted: false,
    });

    if (!dataFromCollege)
      return res
        .status(404)
        .send({ status: false, message: "no college found with this name" });

    const dataOfIntern = await InternModel.find({
      collegeId: dataFromCollege._id,
      isDeleted: false,
    }).select({createdAt:0,updatedAt:0, collegeId: 0, __v: 0 });

    if (dataOfIntern.length == 0)
      return res
        .status(200)
        .send({
          status: true,
          message: "no intern applied for internship at this college",
        });

    let data = {
      name: collegeName,
      fullName: dataFromCollege.fullName,
      logoLink: dataFromCollege.logoLink,
      interns: dataOfIntern,
    };

    return res.status(200).send({ status: true, data: data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

// << Exported Modules =>>
module.exports = { createCollege, getColleges };







