import express from "express"
import {registerUser,userlogin} from "../controllers/auth.controller.js";
const router = express.Router()

router.post('/register' ,registerUser)
router.post('/login' , userlogin)

export default router;








