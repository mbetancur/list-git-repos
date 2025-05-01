// Using this file to fake persistence of credentials
// This is not a good practice, but it's just for the sake of the exercise
// In a real application, we should use a database or a more secure method to store credentials
export interface GitHubCredentials {
  clientId: string;
  clientSecret: string;
  accessToken: string | null;
}

export let githubCredentials: GitHubCredentials = {
  clientId: '',
  clientSecret: '',
  accessToken: null
};

export interface GitHubRepository {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
}