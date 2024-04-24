import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  form!: FormGroup;
  isSubmitted = false;
  openModal = false;

  constructor() {}

  openLocationModal() {
    this.openModal = true;
    this.formData();
  }

  formData() {
    this.form = new FormGroup({
      lat: new FormControl(null, {validators: [Validators.required]}),
      lng: new FormControl(null, {validators: [Validators.required]}),
    });
  }

  async onSubmit() {
    if(!this.form.valid) return;
    try {
      this.isSubmitted = true;
      // update location
      const source = {
        lat: this.form.value.lat,
        lng: this.form.value.lng
      };
      console.log(source);
      
      this.isSubmitted = false;
      this.openModal = false;
    } catch(e) {
      this.isSubmitted = false;
      console.log(e);
    }
  }

}
