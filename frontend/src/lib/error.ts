export class AppError {
  message: string

  constructor(message: string) {
    this.message = message
  }
}

export interface CustomError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}
