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
  displayedColumns: string[] = ['id', 'model', 'brand', 'actions'];
  computers = new MatTableDataSource<Computer>();

  constructor(private computerSrv: ComputerService) {
    this.loadData();
  }

  loadData() {
    this.computerSrv.getComputers().subscribe({
      next: (list) => {
        this.computers.data = list;
      },
      error: (err) => {
        alert('Upss');
      },
    });
  }

  deleteComputer(item: Computer) {
    this.computerSrv.deleteComputer(item.id!).subscribe({
      next: () => {
        this.loadData();
      },
      error(err) {
        alert(err);
      },
    });
  }
}
