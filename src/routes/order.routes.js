import app from "../app.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { order } from "../controllers/order.controller.js";

import express from"express"

const orderRouter = express.Router()

orderRouter.post('/',order)


export {orderRouter}