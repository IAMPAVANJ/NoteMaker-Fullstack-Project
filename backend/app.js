const express = require("express")
const port = 8080;
const app = express();
const signup = require("./Routes/register")
const login = require("./Routes/login")
const note = require("./Routes/notesRoute")
const connection = require("./config/db")
require("dotenv").config();
const cors = require("cors");
app.use(express.json())
app.use(cors());

// app.get("/",(req,res)=>{
//     res.send("welcome to home page")
// })
app.use("/auth",signup)
app.use("/auth",login)
app.use("/note",note)
app.listen(port,async()=>{
    try{
        await connection
        console.log(`server is up at ${port}`)
        console.log("connected to mongo db")
    }catch(err){
        console.log("connection Failed")
        console.log("connection Failed with mongo db")
        console.log(err)
    }
})