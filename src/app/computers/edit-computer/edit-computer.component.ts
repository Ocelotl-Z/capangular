import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css'],
})
export class EditComputerComponent {
  computerId: number = 0;

  computer?: Computer;

  constructor(
    private route: ActivatedRoute,
    private computerSrv: ComputerService
  ) {
    this.route.params.subscribe({
      next: (params) => {
        this.computerId = params['id'];
        this.computerSrv.getByID(this.computerId).subscribe({
          next: (data) => {
            this.computer = data;
          },
          error(err) {
            alert(err);
          },
        });
      },
    });
  }

  updateComputer() {}
}
