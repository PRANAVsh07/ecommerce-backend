
import dotenv from "dotenv";

dotenv.config();

// Import Redis only after environment variables are loaded.
const { default: redisClient } = await import("./src/config/redis.js");

const testRedis = async () => {
    try {
        await redisClient.connect();

        await redisClient.set("test:message", "Redis is working!");

        const result = await redisClient.get("test:message");

        console.log("Retrieved value:", result);
    } catch (error) {
        console.error("Redis test failed:", error);
    } finally {
        if (redisClient.isOpen) {
            await redisClient.quit();
        }
    }
};

await testRedis();

