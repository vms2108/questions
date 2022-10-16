import { QuestionsModule } from './../../modules/questions/questions.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    QuestionsModule,
  ],

  declarations: [
    IndexComponent,
  ],

  exports: [
    IndexComponent,
  ],
})
export class IndexModule {}


