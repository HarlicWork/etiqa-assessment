import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Skillset, Hobbies } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

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
      .subscribe((userData) => {
        this.users = userData;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    return { ...this.users.find((u) => u.id === id) };
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
      .post<{ postId: string; users: User[] }>(
        'http://localhost:3000/api/users/signup',
        user
      )
      .subscribe((result) => {
        const id = result.postId;
        // set user id when create
        user.id = id;
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
      });
  }

  updateUser(
    id: string,
    userName: string,
    email: string,
    password: string,
    phoneNumber: string,
    skillsets: Skillset[],
    hobbies: Hobbies[]
  ) {
    const user: User = {
      id: id,
      userName: userName,
      email: email,
      password: password,
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
        this.usersUpdated.next([...this.users]);
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
