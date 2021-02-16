import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpiComponent } from './gpi.component';
import { GpiRoutingModule } from './gpi-routing.module';
@NgModule({
  declarations: [
    GpiComponent
  ],
  imports: [
    GpiRoutingModule,
    CommonModule
  ]
})
export class GpiModule { }
