import  {cart} from "../controllers/cart.controller.js"
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

export{cartservice,updatecart}