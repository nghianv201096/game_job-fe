import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent {
  isProduction = environment.production;
  sampleData: any = {
    firstName: 'Nghia',
    lastName: 'Nguyen',
    address: {
      street: 'Phan Boi Chau',
      district: 'Hung Nguyen',
      city: 'Nghe An',
    },
    skills: ['.NET', 'Azure', 'SQL SERVER'],
  };

  data: any = {};
  isValid = false;

  constructor(private fb: FormBuilder) {}

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      district: ['', Validators.required],
      city: ['', Validators.required],
    }),
    skills: this.fb.array([this.fb.control('')]),
  });

  get firstName() {
    return this.profileForm.get('firstName') ?? { errors: [] as any };
  }

  get lastName() {
    return this.profileForm.get('lastName') ?? { errors: [] as any};
  }

  get skills() {
    return this.profileForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  saveProfile() {
    if(!this.profileForm.valid) {
      return;
    }

    this.data = this.profileForm.getRawValue();
  }

  seedData() {
    this.profileForm.patchValue(this.sampleData);
  }

  resetData() {
    this.profileForm.reset();
  }
}
