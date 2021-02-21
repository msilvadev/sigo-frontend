import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GcaComponent } from './gca.component';

const routes: Routes = [
  {
    path: '',
    component: GcaComponent,
    data: {
      title: 'Gestão de Consultoria e Assessoria'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GcaRoutingModule {}
