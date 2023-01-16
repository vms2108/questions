import { NumberControlModule } from './../../shared/form-controls/number-control/number-control.module';
import { MatIconModule } from '@angular/material/icon';
import { TextareaControlModule } from 'src/app/shared/form-controls/textarea-control/textarea-control.module';
import { TextControlModule } from 'src/app/shared/form-controls/text-control/text-control.module';
import { SelectControlModule } from 'src/app/shared/form-controls/select-control/select-control.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from './common/question.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from 'src/app/shared/notifications/notification.module';
import { ArrayControlModule } from 'src/app/shared/form-controls/array-control/array-control.module';
import { CONTROL_COMPONENTS } from './controls/control.components';
import { QuestionEditorComponent } from './editor/question-editor.component';
import { LearnModule } from 'src/app/shared/learn/learn.module';

@NgModule({
  imports: [
    CommonModule,
    SelectControlModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
    TextControlModule,
    TextareaControlModule,
    ArrayControlModule,
    NumberControlModule,
    MatIconModule,
    LearnModule,
  ],
  providers: [
    QuestionService,
  ],
  declarations: [
    CONTROL_COMPONENTS,
    QuestionEditorComponent,
    QuestionsComponent,
  ],
  exports: [
    QuestionsComponent,
  ],
})
export class QuestionsModule { }
