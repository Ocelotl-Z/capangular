import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css'],
})
export class EditComputerComponent {
  constructor(private route: ActivatedRoute) {
    route.params.subscribe({
      next: (params) => {
        const id = params['id'];
        console.log(id);
      },
    });
  }
}
