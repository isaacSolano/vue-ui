import { User } from "@/models/User";
import { Response } from "@/models/Response";

export class UserService {
  public async loginUser(
    emailAddress: string,
    password: string
  ): Promise<Response> {
    const userToBeVerified: User = this.getUserById(emailAddress);

    if (userToBeVerified === undefined) {
      return new Response("Error", "This email address is not registered");
    } else if (userToBeVerified.Password === password) {
      return new Response("Success", "Welcome :)");
    } else {
      return new Response("Error", "Sorry, the password is incorrect");
    }
  }

  public setActiveUser(emailAddress: string) {
    sessionStorage.setItem("activeUser", emailAddress);
  }

  public getActiveUser(): string {
    return sessionStorage.getItem("activeUser") || "null";
  }

  public registerUser(user: User): string {
    const allUsers: Array<unknown> = [];
    allUsers.push(user);
    localStorage.setItem("usersLS", JSON.stringify(allUsers));

    return "User registered";
  }

  public getUserById(id: string): User {
    return this.getAllUsers().find((user: User) => user.EmailAddress === id);
  }

  public getAllUsers() {
    return JSON.parse(localStorage.getItem("usersLS") || "[]");
  }
}
