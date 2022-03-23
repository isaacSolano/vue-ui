import { Model } from "./Model";

export class User extends Model {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  Password: string;

  constructor() {
    super();
    this.FirstName = "";
    this.LastName = "";
    this.EmailAddress = "";
    this.Password = "";
  }
}
