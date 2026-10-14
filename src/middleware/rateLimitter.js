import redisClient from "../config/redis.js";

const rateLimiter = async (req, res, next) => {
    try{
const limit = 5;
const windowSeconds = 60;

const key = `ratelimit:login:${req.ip}`;


const count = await redisClient.eval(
    `local count = redis.call('INCR', KEYS[1])
     if count == 1 then
         redis.call('EXPIRE', KEYS[1], ARGV[1])
     end
     return count`,
    {
        keys: [key],
        arguments: [String(windowSeconds)]
    }
);

if (count>limit) {
    return res.status(429).json({
        message: "Too many requests. Please try again later.",
    
    });
}

next();
    }
    catch(err){
       return res.status(503).json({
    message: "Login service temporarily unavailable. Please try again later."
}); 
    }
}

export default rateLimiter;


