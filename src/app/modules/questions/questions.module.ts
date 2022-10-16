import { SelectControlModule } from './../../shared/form-controls/select-control/select-control.module';
import { QuestionsFilterControlComponent } from './controls/filter/questions-filter-control.component';
import { SelectControlComponent } from './../../shared/form-controls/select-control/select-control.component';
import { CardModule } from './../../shared/card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    SelectControlModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    QuestionsComponent,
    QuestionsFilterControlComponent,
  ],
  exports: [
    QuestionsComponent,
  ],
})
export class QuestionsModule { }
