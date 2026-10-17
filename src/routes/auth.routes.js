import express from "express"
import {registerUser,userlogin ,profile,newToken} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js"
import roleMiddleware from "../middleware/role.middleware.js";
import rateLimiter from "../middleware/rateLimitter.js";

const router = express.Router()

router.post('/register' ,registerUser)
router.post('/login' ,rateLimiter, userlogin)
router.get('/me',authMiddleware,roleMiddleware,profile)
router.post('/refresh',newToken)





export default router;








