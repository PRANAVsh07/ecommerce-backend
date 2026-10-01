import AppError from "../error/usererror.js"

const Productvalidate = (data)=>{
    const {name,price ,stock,description,category }=data

if (name == null || description == null || price == null || category == null || stock == null) {
    throw new AppError("Required field is missing", 400);
}

    if(price==""||stock ==""){
     throw  new AppError("field is empty" , 400)
    }

     if(price<0||stock<0){
     throw  new AppError("Cannot be negative" , 400)
    }
    

    if(name==""){
     throw new AppError("Name cannot be empty" ,400)
    }

    if(category==""){
     throw new AppError("category cannot be empty" ,400)
    }

    if(description==""){
     throw new AppError("description cannot be empty" ,400)
    }
}

export default Productvalidate