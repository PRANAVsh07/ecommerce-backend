import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerService = async (data) => {
    const { email, password, name } = data;

     const existingUser = await User.findOne({ email });

          if (existingUser) {
      throw new Error("Email already registered");
}
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        password: hashedPassword,
        email
    });

    return user;
};

export default registerService;