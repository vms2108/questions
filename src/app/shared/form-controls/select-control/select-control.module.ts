import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { OptionComponent } from './option/option.component';
import { SelectControlComponent } from './select-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],

  declarations: [
    OptionComponent,
    SelectControlComponent,
  ],

  exports: [
    OptionComponent,
    SelectControlComponent,
  ],
})
export class SelectControlModule {
}
