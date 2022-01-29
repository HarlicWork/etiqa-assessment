import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers() {
    // return [...this.users];
    this.http
      .get<{ users: any }>('http://localhost:3000/api/users')
      .pipe(
        map((userData) => {
          return userData.users.map((user) => {
            return {
              id: user._id,
              email: user.email,
              password: user.password,
              userName: user.userName,
              phoneNumber: user.phoneNumber,
              skillsets: user.skillsets,
              hobbies: user.hobbies,
            };
          });
        })
      )
      .subscribe((userData) => {
        this.users = userData;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  addUser(newUser: User) {
    const user: User = {
      id: null,
      email: newUser.email,
      password: newUser.password,
      userName: newUser.userName,
      phoneNumber: newUser.phoneNumber,
      skillsets: newUser.skillsets,
      hobbies: newUser.hobbies,
    };
    this.http
      .post<{ users: User[] }>('http://localhost:3000/api/users/signup', user)
      .subscribe((result) => {
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
      });
  }
}
