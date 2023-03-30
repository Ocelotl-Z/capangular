import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputersComponent } from './computers.component';
import { NewComputersComponent } from './new-computers/new-computers.component';
import { EditComputerComponent } from './edit-computer/edit-computer.component';

const routes: Routes = [
  { path: '', component: ComputersComponent },
  { path: 'new', component: NewComputersComponent },
  { path: 'edit/:id', component: EditComputerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComputersRoutingModule {}
