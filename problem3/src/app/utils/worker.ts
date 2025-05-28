import { Message } from "../models/message";
import { redis } from "./redis";
import { getRetryDelayInMinutes, REDIS_BATCH_KEY } from "./helper";

export const processBatchFromRedis = async () => {
  // part: getting message ids
  const ids = await redis.lrange(REDIS_BATCH_KEY, 0, -1);
  if (!ids.length) return;

  for (const id of ids) {
    const message = await Message.findById(id);
    if (!message || message.status === "success") continue;

    const random = Math.floor(Math.random() * 1000);

    // part: updating status and attempt number base on trx Id
    if (message.trxId === random) {
      message.status = "success";
      message.nextAttemptAt = null;
      await message.save();
      // eslint-disable-next-line no-console
      console.log(`✅ Success: trxId ${message.trxId}`);
    } else {
      if (message.attemptCount === 6) {
        message.nextAttemptAt = null; // it fails to send all the time and no next attempt time will attach.
        await message.save();
      } else {
        message.status = "rejected";
        message.attemptCount += 1;
        const delay = getRetryDelayInMinutes(message.attemptCount);
        message.nextAttemptAt = new Date(Date.now() + delay);
        await message.save();
        // eslint-disable-next-line no-console
        console.log(
          `❌ Failed: trxId ${message.trxId} | retry in ${delay / 60000} mins`
        );
      }
    }
  }
  await redis.del(REDIS_BATCH_KEY);
};
