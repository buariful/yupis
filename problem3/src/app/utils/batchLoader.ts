import { Message } from "../models/message";
import {
  LOCK_KEY,
  REDIS_BATCH_KEY,
  REDIS_LOCK_TIME_IN_SECONDS,
} from "./helper";
import { redis } from "./redis";

const BATCH_SIZE = 100;

export const loadBatchToRedis = async () => {
  // part: Lock redis
  const lock = await redis.set(
    LOCK_KEY,
    "locked",
    "EX",
    REDIS_LOCK_TIME_IN_SECONDS,
    "NX"
  );
  if (!lock) return;

  // part: Getting messages
  const now = new Date();
  const messages = await Message.find({
    $or: [
      { status: "pending" },
      { status: "rejected", nextAttemptAt: { $lte: now } },
    ],
  })
    .sort({ createdAt: 1 })
    .limit(BATCH_SIZE)
    .lean();

  if (!messages.length) return;

  const ids = messages.map((m) => m._id.toString());

  // part: deleting prev existing key and storing ids in redis
  await redis.del(REDIS_BATCH_KEY);
  await redis.rpush(REDIS_BATCH_KEY, ...ids);
};
