export class APIResponse {
  message: string;
  statusCode: number;
  data: [] | null;

  constructor(message: string, statusCode: number, data?: []) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data || null;
  }
}
