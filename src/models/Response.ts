import { StatusEnum } from "./StatusEnum";

export class Response {
  Type: StatusEnum;
  Message: string;

  constructor(type: StatusEnum, message: string) {
    this.Type = type;
    this.Message = message;
  }
}
