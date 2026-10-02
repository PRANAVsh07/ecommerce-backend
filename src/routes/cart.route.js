import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import {cart,cartupdate} from "../controllers/cart.controller.js"
import express from"express"

const cartRouter = express.Router()

cartRouter.get('/',authMiddleware,cart)
cartRouter.get('/',authMiddleware,cartupdate)


export {cartRouter}
