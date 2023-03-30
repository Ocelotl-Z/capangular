import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputersComponent } from './computers.component';
import { NewComputersComponent } from './new-computers/new-computers.component';

const routes: Routes = [
  { path: '', component: ComputersComponent },
  { path: 'new', component: NewComputersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComputersRoutingModule {}
