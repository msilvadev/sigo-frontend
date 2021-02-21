import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GcaComponent } from './gca.component';
import { GcaRoutingModule } from './gca-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GcaComponent
  ],
  imports: [
    GcaRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class GcaModule { }
