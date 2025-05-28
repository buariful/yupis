import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import cron from "node-cron";
import { startInsertingMessages } from "./app/utils/insertJob";
import { loadBatchToRedis } from "./app/utils/batchLoader";
import { processBatchFromRedis } from "./app/utils/worker";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    startInsertingMessages();

    /* 
    It runs in every 10 seconds. If it needs to change, then also change the REDIS_LOCK_TIME_IN_SECONDS value in helper.js file accordingly.
    */
    cron.schedule("*/10 * * * * *", async () => {
      await loadBatchToRedis();
      await processBatchFromRedis();
    });

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
