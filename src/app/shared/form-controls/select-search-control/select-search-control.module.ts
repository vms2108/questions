import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';

import { SearchOptionComponent } from '../search-control/option/search-option.component';
import { SearchControlModule } from '../search-control/search-control.module';
import { SelectControlModule } from '../select-control/select-control.module';

import { SelectSearchControlComponent } from './select-search-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    SearchControlModule,
    SelectControlModule,
  ],

  providers: [
    MatSelect,
  ],

  declarations: [
    SearchOptionComponent,
    SelectSearchControlComponent,
  ],

  exports: [
    SearchOptionComponent,
    SelectSearchControlComponent,
  ],
})
export class SelectSearchControlModule {
}
