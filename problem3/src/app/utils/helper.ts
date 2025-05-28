export function getRetryDelayInMinutes(attempt: number): number {
  if (attempt === 1) return 2 * 60000;
  if (attempt === 2) return 5 * 60000;
  if (attempt === 3) return 10 * 60000;
  if (attempt === 4) return 20 * 60000;
  if (attempt === 5) return 30 * 60000;
  return 60 * 60000;
}

export const LOCK_KEY = "processing:lock";
export const REDIS_BATCH_KEY = "batch:queue";
export const REDIS_LOCK_TIME_IN_SECONDS = 10;
