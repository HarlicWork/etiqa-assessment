import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];

  getUsers() {
    return [...this.users];
  }

  addUser(newUser: User) {
    const user: User = {
      email: newUser.email,
      password: newUser.password,
      userName: newUser.userName,
      phoneNumber: newUser.phoneNumber,
      skillsets: newUser.skillsets,
      hobbies: newUser.hobbies,
    };

    this.users.push(user);
  }
}
