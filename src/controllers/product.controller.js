import AppError from "../error/usererror.js"
import { createProductService,getProduct,update } from "../services/product.service.js"


const createProduct = async(req ,res)=>{
      const result = await createProductService(req.body)

       res.status(200).json({
        message:"Product Created Succfully",
        result
       })

}

const getProducts = async (req, res) => {
    const productid = req.params.id;
    const result = await getProduct(productid);

    if (!result) {
        throw new AppError("Product not found", 404);
    }

    if (Array.isArray(result) && result.length === 0) {
        throw new AppError("No products found", 404);
    }

    res.status(200).json({
        message: "Products",
        result,
    });
}; 

const updateProduct = async(req,res)=>{
     const id = req.params.id
     const change = req.body

     const result = await update(id,change)

     res.status(200).json({
        message:"Product Updated Successfully",
        result
     })
}

export  { createProduct,getProducts ,updateProduct } 
