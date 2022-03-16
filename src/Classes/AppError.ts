export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  private readonly generetionDate: number;

  constructor(message: string, statusCode = 500) {
    this.message = message;
    this.statusCode = statusCode;
    this.generetionDate = Date.now();
  }
  public getDate(): Date {
    const convertedToDate = new Date(this.generetionDate);
    return convertedToDate;
  }
}
