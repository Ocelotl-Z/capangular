import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputersRoutingModule } from './computers-routing.module';
import { ComputersComponent } from './computers.component';


@NgModule({
  declarations: [
    ComputersComponent
  ],
  imports: [
    CommonModule,
    ComputersRoutingModule
  ]
})
export class ComputersModule { }
