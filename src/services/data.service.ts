import { User } from "@/models/User";
import { Response } from "@/models/Response";
import { ResponseStatusType } from "@/models/ResponseStatusType";

export class DataService {
  public async loginUser(
    emailAddress: string,
    password: string
  ): Promise<Response> {
    const userToBeVerified: User = this.getUserById(emailAddress);

    if (userToBeVerified === undefined) {
      return new Response(
        ResponseStatusType.ERROR,
        "This email address is not registered."
      );
    } else if (userToBeVerified.Password === password) {
      return new Response(ResponseStatusType.SUCCESS, "Welcome :)");
    } else {
      return new Response(
        ResponseStatusType.ERROR,
        "Sorry, the user couldn't be verified."
      );
    }
  }

  public async registerUser(user: User): Promise<Response> {
    const allUsers: Array<unknown> = [];
    allUsers.push(user);
    localStorage.setItem("usersLS", JSON.stringify(allUsers));

    return new Response(ResponseStatusType.SUCCESS, "User registered");
  }

  public getUserById(id: string): User {
    return this.getAllUsers().find((user: User) => user.EmailAddress === id);
  }

  public getAllUsers() {
    return JSON.parse(localStorage.getItem("usersLS") || "[]");
  }
}
