export class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}
