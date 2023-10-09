import express from "express"
import {verifyToken} from "../util/Token.js"
import { dleted, updateuser } from "../Controller/UserController.js"


const router  = express.Router()









router.post("/updated/:id"  ,verifyToken, updateuser)
router.delete("/dleted/:id"  ,verifyToken, dleted)
export default router
