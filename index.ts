import { HTTPClient } from "./http/index.ts";
import { ClientOptions } from "./http/options.ts";
import { ListUsersParameters } from "./http/parameters.ts";
import { CurrentUser, User } from "./models/user.ts";

class Client {
  http: HTTPClient;

  constructor(public clientOptions: ClientOptions) {
    this.http = new HTTPClient(clientOptions.authOptions);
  }

  async login() {
    await this.http.login();
  }

  async currentUser(): Promise<CurrentUser> {
    return await this.http
      .getCurrentUser()
      .then((user) => new CurrentUser(this.http, user));
  }

  async getUser(name: string): Promise<User> {
    return await this.http
      .getUser(name)
      .then((user) => new User(this.http, user));
  }

  async listUsers(parameters?: ListUsersParameters): Promise<User[]> {
    return await this.http
      .listUsers(parameters)
      .then((users) => users.map((user) => new User(this.http, user)));
  }
}

export default Client;
