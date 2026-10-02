import Productvalidate from "../validators/Product.validate.js";
import AppError from "../error/usererror.js";
import Product from "../models/product.model.js";




const createProductService = async (data) => {
    const product = data

      Productvalidate(product)

  const newProduct = await Product.create(data)


    return newProduct


};

const getProduct = async(data)=>{
    if(data){
        const specificProduct = await Product.findById(data)
        return specificProduct
    }
    
     const products = await Product.find(data);
    return products;
    
}

const update = async(id ,changes)=>{
   
    if(id==null){
        throw new AppError("id not given" ,404)
    }
    const user = await Product.findById(id)
    if(!user){
        throw new AppError("NO user found",404)
    }
    const updated = await Product.findByIdAndUpdate(id,changes,{new:true})
  return updated

}

const deleteProduct = async(data)=>{

    const user = await Product.findById(data)

       if(!user){
        throw new AppError("NO user found",404)
       }
     const answer  = await Product.findByIdAndDelete(data)

     return answer;
}
export{createProductService, getProduct,update,deleteProduct} 