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

    if (!isValid(name)) {
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
    if (!fullName) return res.status(400).send({ msg: "fullName is required" });

    if (!isValidfullName(fullName)) {
      return res
        .status(400)
        .send({ status: false, msg: "full name is not valid" });
    }

    if (!logoLink) return res.status(400).send({ msg: "logoLink is required" });


    if (!isValidUrl(logoLink)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "logolink is invalid , please enter valid logolink",
        });
    }

    const newCollege = await CollegeModel.create(data);
    return res.status(201).send({ status: true, msg: newCollege });
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

    let collegeId = await CollegeModel.find({ name: collegeName }).select({
      _id: 1,
    });

    if (collegeId.length == 0) {
      return res
        .status(404)
        .send({ status: false, message: "Please enter a valid name" });
    }

    let interns = await InternModel.find({ collegeId: collegeId }).select({
      name: 1,
      email: 1,
      mobile: 1,
      _id: 1,
    });

    if (interns.length == 0) {
      let x = `no interns of ${collegeName} collage`;
    } else {
      var x = interns;
    }

    const result = await CollegeModel.findOne({ name: collegeName }).select({
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
      _v: 0,
    });

    result._doc.interns = x;

    return res.status(200).send({ status: true, data: result });
    
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

// << Exported Modules =>>
module.exports = { createCollege, getColleges };

//### GET /functionup/collegeDetails
// - Returns the college details for the requested college (Expect a query parameter by the name `collegeName`. This is anabbreviated college name. For example `iith`)
// - Returns the list of all interns who have applied for internship at this college.
// - The response structure should look like [this](#college-details)
