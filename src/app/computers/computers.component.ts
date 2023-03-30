import { Component } from '@angular/core';
import { ComputerService } from '../services/computer.service';
import { Computer } from '../model/computer.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css'],
})
export class ComputersComponent {
  displayedColumns: string[] = ['id', 'model', 'brand'];
  computers = new MatTableDataSource<Computer>();

  constructor(private computerSrv: ComputerService) {
    this.computerSrv.getComputers().subscribe({
      next: (list) => {
        this.computers.data = list;
      },
      error: (err) => {
        alert('Upss');
      },
    });
  }
}
