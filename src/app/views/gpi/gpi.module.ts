import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpiComponent } from './gpi.component';
import { GpiRoutingModule } from './gpi-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    GpiComponent
  ],
  imports: [
    GpiRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class GpiModule { }
