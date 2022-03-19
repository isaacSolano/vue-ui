import { ResponseStatusType } from "./ResponseStatusType";

export class Response {
  Type: ResponseStatusType;
  Message: string;
  Data: [] | null;

  constructor(type: ResponseStatusType, message: string, data?: []) {
    this.Type = type;
    this.Message = message;
    this.Data = data || null;
  }
}
