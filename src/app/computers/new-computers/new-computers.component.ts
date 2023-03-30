import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-computers',
  templateUrl: './new-computers.component.html',
  styleUrls: ['./new-computers.component.css'],
})
export class NewComputersComponent {
  formComputer?: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formComputer = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
    });
  }

  createComputer() {
    this.isLoading = true;
    console.log(this.formComputer?.value);
  }
}
