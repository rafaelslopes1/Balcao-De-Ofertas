export class DailyOrderLimitExceededError extends Error {
  constructor() {
    super('Daily order limit exceeded.');
  }
}