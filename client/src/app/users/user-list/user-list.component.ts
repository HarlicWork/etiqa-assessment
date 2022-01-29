import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoading = false;
  private usersSub: Subscription;

  constructor(public userService: UserService) {}

  onDelete(userId: string) {
    this.userService.deleteUser(userId);
  }

  ngOnInit() {
    this.isLoading = true;
    this.userService.getUsers();
    this.usersSub = this.userService
      .getUserUpdateListener()
      .subscribe((usr: User[]) => {
        this.isLoading = false;
        this.users = usr;
      });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
