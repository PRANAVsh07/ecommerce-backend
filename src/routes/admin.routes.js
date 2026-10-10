import authMiddleware from "../middleware/auth.middleware.js"
import roleMiddleware from "../middleware/role.middleware.js";

import { allorders, status } from "../controllers/admin.controller.js";




import express from"express"

const adminRouter = express.Router()
adminRouter.get('/orders',authMiddleware,roleMiddleware,allorders);
adminRouter.patch('/orders/:orderId/status',authMiddleware,roleMiddleware,status);

export  {adminRouter}

