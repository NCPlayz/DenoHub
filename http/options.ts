export interface AuthOptions {
  oauthToken?: string;
  baseURL?: string;
}

export interface ClientOptions {
  authOptions: AuthOptions;
}

export interface RequestOptions {
  json?: Record<string, any>;
  headers?: Record<string, string>;
  checking?: {
    fail404?: boolean;
  };
}

export interface UserEditOptions {
  name?: string;
  email?: string;
  blog?: string;
  company?: string;
  location?: string;
  hireable?: string;
  bio?: string;
  twitter_username?: string;
}
