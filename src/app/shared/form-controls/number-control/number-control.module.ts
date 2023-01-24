import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDirectiveModule } from '../../input-directive/input-directive.module';

import { NumberControlComponent } from './number-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputDirectiveModule,
  ],

  declarations: [
    NumberControlComponent,
  ],

  exports: [
    NumberControlComponent,
  ],
})
export class NumberControlModule {}
