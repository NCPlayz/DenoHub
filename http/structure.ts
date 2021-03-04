export interface BaseEndpointStructure {
  current_user_url: string;
  current_user_authorizations_html_url: string;
  authorizations_url: string;
  code_search_url: string;
  commit_search_url: string;
  emails_url: string;
  emojis_url: string;
  events_url: string;
  feeds_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  hub_url: string;
  issue_search_url: string;
  issues_url: string;
  keys_url: string;
  label_search_url: string;
  notifications_url: string;
  organization_url: string;
  organization_repositories_url: string;
  organization_teams_url: string;
  public_gists_url: string;
  rate_limit_url: string;
  repository_url: string;
  repository_search_url: string;
  current_user_repositories_url: string;
  starred_url: string;
  starred_gists_url: string;
  user_url: string;
  user_organizations_url: string;
  user_repositories_url: string;
  user_search_url: string;
}

export interface UserStructure {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;

  // private info
  private_gists?: number;
  total_private_repos?: number;
  owwned_private_repos?: number;
  disk_usage?: number;
  collaborators?: number;
  two_factor_authentication?: number;
  plan?: PlanStructure;
}

export interface PlanStructure {
  name: string;
  space: bigint;
  collaborators: number;
  private_repos: number;
}
