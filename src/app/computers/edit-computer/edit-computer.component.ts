import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css'],
})
export class EditComputerComponent {
  computerId: number = 0;
  formComputer?: FormGroup;
  computer?: Computer;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private computerSrv: ComputerService
  ) {
    this.route.params.subscribe({
      next: (params) => {
        this.computerId = params['id'];
        this.computerSrv.getByID(this.computerId).subscribe({
          next: (data) => {
            this.loadData(data);
          },
          error: (err) => {
            this.router.navigate(['/computers']);
          },
        });
      },
    });
  }

  loadData(data: Computer) {
    this.computer = data;
    this.formComputer = this.fb.group({
      brand: [data.brand, Validators.required],
      model: [data.model, Validators.required],
    });
  }

  updateComputer() {
    this.computerSrv
      .patchComputer(this.computerId, this.formComputer?.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/computers']);
        },
        error() {
          alert('Error al actualizar');
        },
      });
  }
}
