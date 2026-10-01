import express from "express"
import {registerUser,userlogin ,profile} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js"
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router()

router.post('/register' ,registerUser)
router.post('/login' , userlogin)
router.get('/me',authMiddleware,roleMiddleware,profile)





export default router;








