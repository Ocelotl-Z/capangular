import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-new-computers',
  templateUrl: './new-computers.component.html',
  styleUrls: ['./new-computers.component.css'],
})
export class NewComputersComponent {
  formComputer?: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private computerSrv: ComputerService,
    private router: Router
  ) {
    this.formComputer = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
    });
  }

  createComputer() {
    this.isLoading = true;
    console.log(this.formComputer?.value);

    this.computerSrv.saveComputer(this.formComputer?.value).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/computers']);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
