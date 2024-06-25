export class ApiResponse<T> {
  code: number;
  data?: T;

  constructor(code: number, data?: T) {
    this.code = code;
    this.data = data;
  }
}
