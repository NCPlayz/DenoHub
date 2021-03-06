export const BLOCKED_USERS = "/blocks";
export const BLOCKED_USER = "/blocks/{username}";
export const LIST_USERS = "/users{?since,per_page}";
export const AUTHENTICATED_PRIMARY_EMAIL_VISIBILITY = "/user/email/visibility";
export const AUTHENTICATED_LIST_EMAIL_ADDRESSES = "{?since,per_page}";
export const AUTHENTICATED_LIST_PUBLIC_EMAILS =
  "/user/public_emails{?since,per_page}";
export const AUTHENTICATED_LIST_FOLLOWERS = "{?since,per_page}";
export const LIST_FOLLOWERS = "/users/{username}/followers{?since,per_page}";
export const LIST_FOLLOWING = "/users/{username}/following{?since,per_page}";
export const IS_FOLLOWING = "/users/{username}/following/{target_user}";
