import Productvalidate from "../validators/Product.validate.js";
import AppError from "../error/usererror.js";
import Product from "../models/product.model.js";
import redisClient from "../config/redis.js";



const createProductService = async (data) => {
    const product = data

      Productvalidate(product)

  const newProduct = await Product.create(data)
try {
await redisClient.incr("products:version");
} catch (error) {
console.error("Product cache invalidation failed:", error.message);
}

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
   try {
await redisClient.incr("products:version");
} catch (error) {
console.error("Product cache invalidation failed:", error.message);
}
  return updated

}

const deleteProduct = async(data)=>{

    const user = await Product.findById(data)

       if(!user){
        throw new AppError("NO user found",404)
       }
     const answer  = await Product.findByIdAndDelete(data)
try {
await redisClient.incr("products:version");
} catch (error) {
console.error("Product cache invalidation failed:", error.message);
}

     return answer;
}



const searchProducts = async (query) => {
  let cacheKey;
let cachedData = null;
let cacheAvailable = true;

try {
    const version = await redisClient.get("products:version");
    const currentVersion = version ?? "1";

    cacheKey = `products:v${currentVersion}:${JSON.stringify(query)}`;

    cachedData = await redisClient.get(cacheKey);
} catch (error) {
    cacheAvailable = false;
    console.error("Redis cache read failed:", error.message);
}

if (cacheAvailable && cachedData) {
    console.log("Cache HIT");
    return JSON.parse(cachedData);
}

console.log(cacheAvailable ? "Cache MISS" : "Redis unavailable — using MongoDB");
    const {
        search,
        category,
        page = 1,
        limit = 10
    } = query;

    // 1. Build the MongoDB filter
    const filter = {};

    if (search) {
        filter.name = {
            $regex: search,
            $options: "i"
        };
    }

    if (category) {
        filter.category = category;
    }

    // 2. Convert pagination values to numbers
    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(
        100,
        Math.max(1, Number(limit) || 10)
    );

    // 3. Calculate how many products to skip
    const skip = (pageNumber - 1) * pageSize;

    // 4. Fetch products and total count
    const [products, totalProducts] = await Promise.all([
        Product.find(filter)
            .skip(skip)
            .limit(pageSize)
         .sort({ createdAt: -1, _id: 1 }),

        Product.countDocuments(filter)
    ]);

    // 5. Return products and pagination metadata
    const result = {
    products,
    pagination: {
        currentPage: pageNumber,
        pageSize,
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize)
    }
};


if (cacheAvailable && cacheKey) {
    try {
        await redisClient.set(
            cacheKey,
            JSON.stringify(result),
            { EX: 60 }
        );
    } catch (error) {
        console.error("Redis cache write failed:", error.message);
    }
}




return result;
};


export{createProductService, searchProducts,update,deleteProduct,getProduct} 