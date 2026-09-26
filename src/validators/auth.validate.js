import AppError from "../error/usererror.js"

const uservalidate = (data)=>{
    const {name ,email  , password}=data

    if(!name||!email||!password){
     throw  new AppError("field is empty" , 400)
    }

    if(name==""){
     throw new AppError("Name cannot be empty" ,400)
    }
    if(email==""||!email.includes("@")){
      throw   new AppError ("Invalid fromat" ,400)
    }

      if(password==""||password.length<6){
     throw new AppError("Invalid fromat" ,400)
    }
}

export default uservalidate