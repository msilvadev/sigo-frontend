import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardManagerComponent } from './standard-manager.component';
import { FormsModule } from '@angular/forms';
import { StandardRoutingModule } from './standard-routing.module';

@NgModule({
  declarations: [StandardManagerComponent],
  imports: [
    StandardRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class StandardManagerModule { }
