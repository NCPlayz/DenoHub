import { expand } from "https://deno.land/x/deno_uri_template/mod.ts";
import Route from "./route.ts";
import { AuthOptions, RequestOptions } from "./options.ts";
import {
  BaseEndpointStructure,
  UserStructure,
  EmailStructure,
} from "./structure.ts";
import { ListUsersPayload } from "./payload.ts";
import { HTTPException, NotFound } from "./errors.ts";

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

    if (result.status >= 400 && result.status < 500) {
      if (result.status === 404) {
        throw new NotFound(result.json());
      }
      throw new HTTPException(result.json());
    }

    return result.json();
  }

  fromBase(
    method: string,
    url: string,
    parameters: Record<string, any> = {}
  ): Route {
    return new Route(method, this.baseURL + url, parameters);
  }

  getCurrentUser(): Promise<UserStructure> {
    return this.request(new Route("GET", this.urls!.current_user_url));
  }

  getUser(username: string): Promise<UserStructure> {
    return this.request(
      new Route("GET", expand(this.urls!.user_url, { user: username }))
    );
  }

  getEmails(): Promise<EmailStructure[]> {
    return this.request(new Route("GET", this.urls!.emails_url));
  }

  // TODO: It may be good to hard-code template URIs for inner endpoints according to the documentation.

  getBlockedUsers(): Promise<UserStructure[]> {
    return this.request(new Route("GET", this.urls!.current_user_url + "/blocks"));
  }

  // TODO: 204 = true; may need to split up request into a raw and several handlers e.g. pagination and this.
  // checkIfBlocking(username: string): Promise<boolean> {
  //   return this.request(new Route(
  //     "GET",
  //     this.urls!.current_user_url + "/blocks/" + username
  //   ));
  // }

  getEmojis(): Promise<Record<string, string>> {
    return this.request(new Route("GET", this.urls!.emojis_url));
  }

  listUsers(payload?: ListUsersPayload): Promise<UserStructure[]> {
    return this.request(this.fromBase("GET", "/users", payload));
  }
}

export default HTTPClient;
