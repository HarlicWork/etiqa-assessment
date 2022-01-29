import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  getUsers() {
    return [...this.users];
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
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
    this.usersUpdated.next([...this.users]);
  }
}
