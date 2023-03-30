import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputersRoutingModule } from './computers-routing.module';
import { ComputersComponent } from './computers.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { ReactiveFormsModule } from '@angular/forms';

import { NewComputersComponent } from './new-computers/new-computers.component';
import { EditComputerComponent } from './edit-computer/edit-computer.component';

@NgModule({
  declarations: [ComputersComponent, NewComputersComponent, EditComputerComponent],
  imports: [
    CommonModule,
    ComputersRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ComputersModule {}
