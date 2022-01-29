import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

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
export class RegisterComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  enteredUserName = '';
  enteredPassword = '';
  enteredEmail = '';
  enteredPhone = '';
  enteredSkillSets: Skillset[] = [{ name: 'Angular' }, { name: 'MongoDB' }];
  enteredHobbies: Hobbies[] = [{ name: 'Travel' }];
  @Output() userCreated = new EventEmitter();

  onRegisterHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const userData: User = {
      email: form.value.email,
      password: form.value.password,
      userName: form.value.name,
      phoneNumber: form.value.phone,
      skillsets: this.enteredSkillSets,
      hobbies: this.enteredHobbies,
    };

    this.userCreated.emit(userData);
    console.log(userData);
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
