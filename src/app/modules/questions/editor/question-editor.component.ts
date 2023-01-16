import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { QuestionFull } from 'src/app/common/models/question-full';
import { NotificationService } from 'src/app/shared/notifications/notification.service';
import { QuestionService } from '../common/question.service';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionEditorComponent implements OnChanges {

  @Input()
  public isCopy = false;

  @Input()
  public question: QuestionFull | null = null;

  @Output()
  public questionChanged = new EventEmitter<void>();

  @ViewChild('currentContainer', { read: ViewContainerRef })
  public currentContainer!: ViewContainerRef;

  public form!: FormGroup;

  public loading = false;

  private destroy =  new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly questionService: QuestionService,
    private readonly notificationService: NotificationService,
  ) {
  }

  public ngOnChanges(): void {
    if (this.question) {
      this.createFillForm();
    } else {
      this.createEmptyForm();
    }
  }

  public apply(): void {
    const question = this.form.value;
    this.isCopy ? this.create(question) : this.question ? this.update(question) : this.create(question);
  }

  private update(question: QuestionFull): void {
    question._id = this.question._id;

    this.setLoading(true);
    this.questionService
      .update(question)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this.notificationService.success('Вопрос успешно изменен.');
        this.questionChanged.emit();
      });
  }

  private create(question: QuestionFull): void {
    this.setLoading(true);
    this.questionService
      .create(question)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this.notificationService.success('Вопрос успешно сохранён.');
        this.questionChanged.emit();
      });
  }

  private createEmptyForm(): void {
    this.form = this.formBuilder.group({
      _id: [''],
      parameters: [null],
    });
  }

  private createFillForm(): void {
    this.form = this.formBuilder.group({
      _id: [this.question._id],
      parameters: [this.question.parameters],
    });
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
