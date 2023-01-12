const express = require("express");
const app = express();
const multer=require("multer")
const { default: mongoose } = require("mongoose");
const route = require("./routes/route");

mongoose.set("strictQuery", false);


app.use(express.json());
app.use(multer().any())

mongoose
  .connect(
    "mongodb+srv://vintiray:7091201680@cluster0.ahtxrqr.mongodb.net/groupXDatabase",
    {
      useNewUrlParser: true,
    }
  )

  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(3001, () => {
  console.log("Express app running on port " + 3001);
});
