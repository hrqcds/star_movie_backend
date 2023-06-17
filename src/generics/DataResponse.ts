export class DataResponse<T> {
  public Data: T[];
  public Total: number;

  constructor(data: T[], total: number) {
    this.Data = data;
    this.Total = total;
  }
}
