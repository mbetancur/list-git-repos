// Using this file to fake persistence of credentials
// This is not a good practice, but it's just for the sake of the exercise
// In a real application, we should use a database or a more secure method to store credentials
export interface User {
  username: string;
  password: string;
}

export let users: User[] = []; 