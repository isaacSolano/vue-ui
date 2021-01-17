import { User } from "@/models/User";
import { Response } from "@/models/Response";
import { StatusEnum } from "@/models/StatusEnum";

export class UserService {
  public async loginUser(
    emailAddress: string,
    password: string
  ): Promise<Response> {
    const userToBeVerified: User = this.getUserById(emailAddress);

    if (userToBeVerified === undefined) {
      return new Response(
        StatusEnum.Error,
        "This email address is not registered."
      );
    } else if (userToBeVerified.Password === password) {
      return new Response(StatusEnum.Success, "Welcome :)");
    } else {
      return new Response(
        StatusEnum.Error,
        "Sorry, the user couldn't be verified."
      );
    }
  }

  public async registerUser(user: User): Promise<Response> {
    const allUsers: Array<unknown> = [];
    allUsers.push(user);
    localStorage.setItem("usersLS", JSON.stringify(allUsers));

    return new Response(StatusEnum.Success, "User registered");
  }

  public getUserById(id: string): User {
    return this.getAllUsers().find((user: User) => user.EmailAddress === id);
  }

  public getAllUsers() {
    return JSON.parse(localStorage.getItem("usersLS") || "[]");
  }
}
