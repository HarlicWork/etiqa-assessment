import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  //dummy data
  @Input() users = [
    {
      userName: 'Mario',
      email: 'mario@dev.com',
      password: 'abc123',
      phoneNumber: '0123456789',
      skillsets: [{ name: 'angular' }, { name: 'MongoDB' }],
      hobbies: [{ name: 'futsal' }, { name: 'gaming' }],
    },
    {
      userName: 'Luigi',
      email: 'luigi@dev.com',
      password: 'abc123',
      phoneNumber: '0123456789',
      skillsets: [{ name: 'react' }, { name: 'Firebase' }],
      hobbies: [{ name: 'badminton' }, { name: 'travelling' }],
    },
    {
      userName: 'Bowser',
      email: 'bowser@dev.com',
      password: 'abc123',
      phoneNumber: '0123456789',
      skillsets: [{ name: 'vue' }, { name: 'MySQL' }],
      hobbies: [{ name: 'cooking' }, { name: 'eating' }],
    },
  ];
}
