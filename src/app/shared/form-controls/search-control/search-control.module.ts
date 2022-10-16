import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { SearchControlComponent } from './search-control.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  declarations: [
    SearchControlComponent,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    SearchControlComponent,
  ],
})
export class SearchControlModule { }
