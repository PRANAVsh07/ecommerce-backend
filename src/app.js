import express from"express"
import cors from "cors";
import router from "./routes/auth.routes.js"
import errormiddleware from  "./middleware/error.middleware.js"
import productRouter from "./routes/product.routes.js";
import { cartRouter } from "./routes/cart.route.js";
import { orderRouter } from "./routes/order.routes.js";
import { paymentRouter } from "./routes/paymnet.route.js";
const app = express()

app.use(cors());
app.use(express.json());
app.use('/api/auth/',router)
app.use('/api/products',productRouter)

app.use('/api/cart',cartRouter)

app.use('/api/orders',orderRouter)
app.use("/api/payments", paymentRouter);


app.use(errormiddleware);

export default app
