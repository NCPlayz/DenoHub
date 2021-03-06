import { expand } from "https://deno.land/x/deno_uri_template/mod.ts";
import Route from "./route.ts";
import { AuthOptions, RequestOptions, UserEditOptions } from "./options.ts";
import {
  BaseEndpointStructure,
  UserStructure,
  EmailStructure,
} from "./structure.ts";
import { filterParameters, ListUsersParameters } from "./parameters.ts";
import { HTTPException, NotFound } from "./errors.ts";
import * as URI_TEMPLATES from "./uri_templates.ts";

const DEFAULT_URL = "https://api.github.com";

class HTTPClient {
  urls?: BaseEndpointStructure;
  baseURL: string;

  constructor(public auth: AuthOptions) {
    this.baseURL = this.auth.baseURL || DEFAULT_URL;
  }

  async login() {
    this.urls = await this.request(new Route("GET", this.baseURL));
  }

  async request(route: Route, options?: RequestOptions): Promise<any> {
    // TODO: ratelimits
    let headers = options?.headers || {};
    headers["Authorization"] = `token ${this.auth.oauthToken}`;
    headers["Content-Type"] = `application/json`;
    headers["User-Agent"] = "NCPlayz/DenoHub";
    let result: Response = await fetch(route.url, {
      method: route.verb,
      headers: headers,
      body: JSON.stringify(options?.json || {}),
    });

    if (options?.checking) {
      if (result.status == 204) {
        return true;
      } else if (result.status == 404 && options.checking.fail404) {
        return false;
      }
    }

    if (result.status >= 400 && result.status < 500) {
      if (result.status === 404) {
        throw new NotFound(await result.json());
      }
      throw new HTTPException(await result.json());
    }

    return result.json();
  }

  fromBase(method: string, url: string): Route {
    return new Route(method, this.baseURL + url);
  }

  getCurrentUser(): Promise<UserStructure> {
    return this.request(new Route("GET", this.urls!.current_user_url));
  }

  editCurrentUser(options: UserEditOptions): Promise<UserStructure> {
    return this.request(new Route("PATCH", this.urls!.current_user_url), {
      json: options,
    });
  }

  getUser(username: string): Promise<UserStructure> {
    return this.request(
      new Route("GET", expand(this.urls!.user_url, { user: username }))
    );
  }

  getEmails(): Promise<EmailStructure[]> {
    return this.request(new Route("GET", this.urls!.emails_url));
  }

  getBlockedUsers(): Promise<UserStructure[]> {
    return this.request(
      new Route(
        "GET",
        this.urls!.current_user_url + URI_TEMPLATES.BLOCKED_USERS
      )
    );
  }

  // TODO: may need to split up request into a raw and several handlers e.g. pagination.

  checkIfBlocking(username: string): Promise<boolean> {
    return this.request(
      new Route(
        "GET",
        expand(this.urls!.current_user_url + URI_TEMPLATES.BLOCKED_USER, {
          username,
        })
      ),
      {
        checking: {
          fail404: true,
        },
      }
    );
  }

  blockUser(username: string): Promise<boolean> {
    let reqOptions: RequestOptions = { checking: {} };
    return this.request(
      new Route(
        "PUT",
        expand(this.urls!.current_user_url + URI_TEMPLATES.BLOCKED_USER, {
          username,
        })
      ),
      reqOptions
    );
  }

  unblockUser(username: string): Promise<boolean> {
    let reqOptions: RequestOptions = { checking: {} };
    return this.request(
      new Route(
        "DELETE",
        expand(this.urls!.current_user_url + URI_TEMPLATES.BLOCKED_USER, {
          username,
        })
      ),
      reqOptions
    );
  }

  getEmojis(): Promise<Record<string, string>> {
    return this.request(new Route("GET", this.urls!.emojis_url));
  }

  listUsers(parameters?: ListUsersParameters): Promise<UserStructure[]> {
    return this.request(
      this.fromBase(
        "GET",
        expand(URI_TEMPLATES.LIST_USERS, filterParameters(parameters || {}))
      )
    );
  }
}

export default HTTPClient;
