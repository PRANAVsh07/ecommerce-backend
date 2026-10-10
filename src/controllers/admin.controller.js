import AppError from "../error/usererror.js";
import { orders,orderstatus } from "../services/admin.service.js";

const allorders =async(req ,res)=>{
    const result = await orders();
     res.status(200),json({
        message:"Here are your orders",
        result
     })
};

const status = async(req,res)=>{
    try{
    const status = req.body.status;
    const data = req.params.orderId
    result =await orderstatus(data,status)

    res.status(200).json({
        message:"status update successfullt",
        result,
    
})
    }
    catch(error){
        next(error)
    }
}
export{allorders,status};

