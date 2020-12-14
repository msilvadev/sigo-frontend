import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GpiComponent } from './gpi.component';

const routes: Routes = [
  {
    path: '',
    component: GpiComponent,
    data: {
      title: 'Processos Industriais'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpiRoutingModule {}
