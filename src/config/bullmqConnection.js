import IORedis from "ioredis";

const bullRedisConnection = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null
});

bullRedisConnection.on("connect", () => {
    console.log("BullMQ Redis connected");
});

bullRedisConnection.on("error", (error) => {
    console.error("BullMQ Redis Error:", error.message);
});

export default bullRedisConnection;