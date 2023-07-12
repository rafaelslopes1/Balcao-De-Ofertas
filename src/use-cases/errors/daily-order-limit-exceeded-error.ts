export class DailyOrderLimitExceeded extends Error {
  constructor() {
    super('Daily order limit exceeded.');
  }
}