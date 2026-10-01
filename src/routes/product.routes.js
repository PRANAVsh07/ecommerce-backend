import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { createProduct,getProducts,updateProduct  } from "../controllers/product.controller.js";



import express from "express";

const productRouter = express.Router();
productRouter.post("/", authMiddleware, roleMiddleware, createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProducts);
productRouter.patch('/:id',authMiddleware, roleMiddleware,updateProduct )



export default productRouter;