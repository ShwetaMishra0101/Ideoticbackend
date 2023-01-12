

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", true);

app.use(cors())
const user = require("./models/User.model");
// const user = mongoose.model("userInfo")
// new user register
app.post("/register", async (req, res) => {
  console.log(req.body)
const { fName, lName, email, password } = req.body;
const encryptedPassword = await bcrypt.hash(password,10)
try {
  user.findOne({ email:email},async (err,data)=>{
    if(data){
      res.send({message:"User already registered"})
    }
    else{
      const data =await user.create({ fName, lName, email, password:encryptedPassword});
      await data.save();
      res.send({message:"successfully registered"});
    }
  });
} catch (err) {
  console.log({status:"err"});
}
});


app.post("/login",async(req,res)=>{
  console.log(req.body)
  const {email, password } = req.body;
  // const encryptedPassword = await bcrypt.hash(password,10)
  try {
    user.findOne({ email:email},async (err,data)=>{
      // console.log(password,data.password)
      if(data){
        
        if(await bcrypt.compare(password,data.password)){
          // const token = jwt.sign({},jwt_secret)
          res.send({message:"login successfull"})
        }
        else{
          res.send({message:"wrong password"});
        }
      }
      else{
        res.send({message:"user not registered"});
      }
    });
  } catch (err) {
    console.log({status:"err"});
  }
})

// database connection 

mongoose
  .connect(process.env.mongo_url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error: " + err);
  });

//   server connection

app.listen(process.env.PORT, () => {
    
  console.log("listening on port " + process.env.PORT);
});