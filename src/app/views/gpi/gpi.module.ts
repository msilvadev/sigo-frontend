import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpiComponent } from './gpi.component';
import { GpiRoutingModule } from './gpi-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [GpiComponent],
  imports: [
    GpiRoutingModule,
    CommonModule,
    Ng2SmartTableModule
  ]
})
export class GpiModule { }
