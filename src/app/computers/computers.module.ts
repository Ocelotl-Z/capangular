import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputersRoutingModule } from './computers-routing.module';
import { ComputersComponent } from './computers.component';

import { MatTableModule } from '@angular/material/table';
import { NewComputersComponent } from './new-computers/new-computers.component';

@NgModule({
  declarations: [ComputersComponent, NewComputersComponent],
  imports: [CommonModule, ComputersRoutingModule, MatTableModule],
})
export class ComputersModule {}
