const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("Db connection Successfull");
}).catch((err)=>{
    console.log(err.message);
});




const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
