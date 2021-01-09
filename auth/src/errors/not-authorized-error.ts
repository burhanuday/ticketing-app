import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  reason = "Not authorized";
  statusCode = 401;

  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
