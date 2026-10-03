import  {cart} from "../controllers/cart.controller.js"
import AppError from "../error/usererror.js";
import Cart from "../models/cart.model.js"
import Product from"../models/product.model.js"

const cartservice = async (data) => {
    const cart = await Cart.findOne({ user: data });

    

    return cart;
};

const updatecart = async (updates, userid) => {

    // 1. Get data
    const productid = updates.productId;
    const value = updates.quantity;

    // 2. Check product exists
    const product = await Product.findById(productid);

    if (!product) {
        throw new AppError("Product not found", 404);
    }
      const amount  = product.stock
    if(amount<value){
        const diff = value-amount
        throw new AppError("Not enough avalible",400)
    }

    // 3. Find user's cart
    const cart = await Cart.findOne({ user: userid });

    // 4. If cart doesn't exist → create it
    if (!cart) {
        const newcart = await Cart.create({
            user: userid,
            items: [
                {
                    product: productid,
                    quantity: value
                }
            ]
        });

        return newcart;
    }

    // 5. Cart exists → find product inside cart
    const item = cart.items.find(
        item => item.product.toString() === productid
    );

    if(item.quantity+value> product.stock){
        throw new AppError("Not enough amount")
    }

    // 6. Product not already in cart
    if (!item) {
        cart.items.push({
            product: productid,
            quantity: value
        });
    }

    // 7. Product already in cart
    else {
        item.quantity += value;
    }

    // 8. Save and return
    await cart.save();

    return cart;
};


const  updateField= async(userid,productid , quantity)=>{

 const user  = userid;
 
 const value = quantity

 const product = await Product.findById(productid);
if (!product) {
    throw new AppError("product not found", 404);
}
  
const finduser = await Cart.findOne({ user: user });
 if(!finduser){
    throw new AppError("user cart not found" , 404)
 }
const item = finduser.items.find(
    item => item.product.toString() === productid
);
 if(!item){
    throw new AppError("usercart not found" , 404)
 }
      if(product.stock<value){
        throw  new AppError("not enough quantuty" ,404)
      }
    item.quantity = value;
    await finduser.save();
  return finduser;

}

const   cartdelete = async(userid,productid)=>{
       const user  = userid;
 


 
const finduser = await Cart.findOne({ user: user });
 if(!finduser){
    throw new AppError("user cart not found" , 404)
 }
const item = finduser.items.find(
    item => item.product.toString() === productid
);
 if(!item){
    throw new AppError("usercart not found" , 404)
 }
   
   finduser.items = finduser.items.filter(
    item => item.product.toString() !== productid
);


    await finduser.save();
  return finduser;
}

const dleteAllCart = async(data)=>{
        const user  = data;
 


 
const finduser = await Cart.findOne({ user: data });
 if(!finduser){
    throw new AppError("user cart not found" , 404)
 }

 finduser.items = [];
await finduser.save();

return finduser;

}
export{cartservice,updatecart , updateField ,cartdelete, dleteAllCart}