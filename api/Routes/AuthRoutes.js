import  expressxpres  from "express";
const router  = expressxpres.Router()
import  { google, signin, signout, signup} from "../Controller/AuthControoler.js"





router.post("/signup" , signup)
router.post("/sigin" , signin)
router.post("/google" , google)
router.get("/signout" , signout)



export default router