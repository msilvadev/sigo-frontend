import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandardManagerComponent } from './standard-manager.component';

const routes: Routes = [
  {
    path: '',
    component: StandardManagerComponent,
    data: {
      title: 'Gestão de Normas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardRoutingModule {}
