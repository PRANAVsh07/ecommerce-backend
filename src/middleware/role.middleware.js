
import AppError from "../error/usererror.js";

const roleMiddleware = (req, res, next) => {
     const role = req.user.role 
     if(role!=="admin"){
        throw new AppError("YOU ARE NOT ADMIN",403)
     }
     next()
};

export default roleMiddleware;