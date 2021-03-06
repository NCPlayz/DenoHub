import { HTTPClient } from "../http/index.ts";
import { UserEditOptions } from "../http/options.ts";
import { UserStructure, PlanStructure } from "../http/structure.ts";

class User {
  constructor(public http: HTTPClient, public data: UserStructure) {}

  get plan(): PlanStructure | undefined {
    return this.data.plan;
  }

  isBlocking(): Promise<boolean> {
    return this.http.checkIfBlocking(this.data.name);
  }

  block(): Promise<boolean> {
    return this.http.blockUser(this.data.name);
  }

  unblock(): Promise<boolean> {
    return this.http.unblockUser(this.data.name);
  }
}

class CurrentUser extends User {
  /* Edits the user. Must be the current authenticated user.
   *
   */
  async edit(options: UserEditOptions): Promise<void> {
    this.data = await this.http.editCurrentUser(options);
  }

  isBlockingUser(username: string): Promise<boolean> {
      return this.http.checkIfBlocking(username);
  }

  blockUser(username: string): Promise<boolean> {
    return this.http.blockUser(username);
  }

  unblockUser(username: string): Promise<boolean> {
    return this.http.unblockUser(username);
  }
}

export { User, CurrentUser };
