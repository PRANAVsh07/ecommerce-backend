
import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error.message);
});

redisClient.on("connect", () => {
    console.log("Redis connection established");
});

redisClient.on("ready", () => {
    console.log("Redis client is ready to use");
});

export default redisClient;

