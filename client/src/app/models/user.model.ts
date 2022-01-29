export interface User {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  skillsets: Skillset[];
  hobbies: Hobbies[];
}

interface Skillset {
  name: string;
}

interface Hobbies {
  name: string;
}
