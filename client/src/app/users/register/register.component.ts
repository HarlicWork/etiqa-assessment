import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { User } from '../../models/user.model';
export interface Skillset {
  name: string;
}

export interface Hobbies {
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  addOnBlur = true;
  user: User;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private mode = 'register';
  private userId: string;
  isLoading = false;

  enteredUserName = '';
  enteredPassword = '';
  enteredEmail = '';
  enteredPhone = '';
  enteredSkillSets: Skillset[] = [{ name: 'Angular' }, { name: 'MongoDB' }];
  enteredHobbies: Hobbies[] = [{ name: 'Travel' }];

  constructor(public userService: UserService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.isLoading = true;
        this.user = this.userService.getUser(this.userId);
        this.isLoading = false;
      } else {
        this.mode = 'register';
        this.userId = null;
      }
    });
  }

  onRegisterHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const userData: User = {
      id: null,
      email: form.value.email,
      password: form.value.password,
      userName: form.value.name,
      phoneNumber: form.value.phone,
      skillsets: this.enteredSkillSets,
      hobbies: this.enteredHobbies,
    };

    if (this.mode === 'register') {
      this.userService.addUser(userData);
    } else {
      this.userService.updateUser(
        this.userId,
        form.value.email,
        form.value.password,
        form.value.name,
        form.value.phone,
        this.enteredSkillSets,
        this.enteredHobbies
      );
    }

    form.reset();
  }

  addSkills(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.enteredSkillSets.push({ name: value });
    }

    event.chipInput!.clear();
  }

  removeSkills(skillset: Skillset): void {
    const index = this.enteredSkillSets.indexOf(skillset);

    if (index >= 0) {
      this.enteredSkillSets.splice(index, 1);
    }
  }

  addHobbies(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.enteredHobbies.push({ name: value });
    }

    event.chipInput!.clear();
  }

  removeHobbies(hobbies: Hobbies): void {
    const index = this.enteredHobbies.indexOf(hobbies);

    if (index >= 0) {
      this.enteredHobbies.splice(index, 1);
    }
  }
}
