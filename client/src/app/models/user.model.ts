export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  skillsets: Skillset[];
  hobbies: Hobbies[];
}

export interface Skillset {
  name: string;
}

export interface Hobbies {
  name: string;
}
