import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers() {
    // return [...this.users];
    this.http
      .get<{ users: User[] }>('http://localhost:3000/api/users')
      .subscribe((userData) => {
        this.users = userData.users;
        this.usersUpdated.next([...this.users]);
        console.log(this.users[0]);
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  addUser(newUser: User) {
    const user: User = {
      id: newUser.id,
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
