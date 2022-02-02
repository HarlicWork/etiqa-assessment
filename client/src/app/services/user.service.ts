import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Skillset, Hobbies } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers() {
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
      .subscribe((transformedUsers) => {
        this.users = transformedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    return this.http.get<{
      _id: string;
      email: string;
      password: string;
      userName: string;
      phoneNumber: string;
      skillsets: Skillset[];
      hobbies: Hobbies[];
    }>('http://localhost:3000/api/users/' + id);
  }

  addUser(
    email: string,
    password: string,
    userName: string,
    phoneNumber: string,
    skillsets: Skillset[],
    hobbies: Hobbies[]
  ) {
    const user: User = {
      id: null,
      email: email,
      password: password,
      userName: userName,
      phoneNumber: phoneNumber,
      skillsets: skillsets,
      hobbies: hobbies,
    };
    this.http
      .post<{ userId: string }>('http://localhost:3000/api/users/signup', user)
      .subscribe((result) => {
        const id = result.userId;
        user.id = id;
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
        this.router.navigate(['/']);
      });
  }

  updateUser(
    id: string,
    email: string,
    password: string,
    userName: string,
    phoneNumber: string,
    skillsets: Skillset[],
    hobbies: Hobbies[]
  ) {
    const user: User = {
      id: id,
      email: email,
      password: password,
      userName: userName,
      phoneNumber: phoneNumber,
      skillsets: skillsets,
      hobbies: hobbies,
    };
    this.http
      .put('http://localhost:3000/api/users/update/' + id, user)
      .subscribe((response) => {
        const updateUsers = [...this.users];
        const oldUserIndex = updateUsers.findIndex((u) => u.id === user.id);
        updateUsers[oldUserIndex] = user;
        this.users = updateUsers;
        this.usersUpdated.next([...this.users]);
        this.router.navigate(['/']);
      });
  }

  deleteUser(userId: string) {
    this.http
      .delete('http://localhost:3000/api/users/' + userId)
      .subscribe(() => {
        const updateUserList = this.users.filter((user) => user.id !== userId);
        this.users = updateUserList;
        this.usersUpdated.next([...this.users]);
      });
  }
}
