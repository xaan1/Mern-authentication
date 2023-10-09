
import   express from "express";
import mongoose from "mongoose"
import  dotenv from "dotenv"
import Userroter from "./Routes/Usrroutes.js"
import Authrote from "./Routes/AuthRoutes.js"
import cors from  "cors"
import cookiparser from "cookie-parser"
import path from "path"


const app = express()
dotenv.config()

app.use(express.json())


app.use(cors())
app.use(cookiparser())
const __dirname = path.resolve();


app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
mongoose.connect(process.env.MONGO)
.then((re) => {
    console.log("connected databse")
}) .catch((e) => console.log(e))


app.use("/api/user" , Userroter)
app.use("/api/auth" , Authrote)


app.listen(8000 , (req,res) => {
    console.log("llow mern authenticatio")
})

