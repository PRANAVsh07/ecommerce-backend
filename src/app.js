import express from"express"
import router from "./routes/auth.routes.js"
import errormiddleware from  "./middleware/error.middleware.js"

const app = express()

app.use(express.json());
app.use('/api/auth',router)



app.use(errormiddleware);

export default app
