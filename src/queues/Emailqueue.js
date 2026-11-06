import { Queue } from "bullmq";
import bullRedisConnection from "../config/bullmqConnection.js";

const emailQueue = new Queue("emailQueue", {
    connection: bullRedisConnection
});

export default emailQueue;