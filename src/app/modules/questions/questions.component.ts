import { map, takeUntil } from 'rxjs/operators';
import { QUESTIONS } from './common/constants/questions';
import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { assocEnumToArray } from 'src/app/shared/control-base/helpers/assoc-enum-to-array.function';
import { StatusEnum } from 'src/app/common/enums/status.enum';
import { ComplexityEnum } from 'src/app/common/enums/complexity.enum';
import { SectionEnum } from 'src/app/common/enums/section.enum';
import { QuestionService } from './common/question.service';
import { QuestionFull } from 'src/app/common/models/question-full';

class Column {
  constructor(
    public id: string,
    public label: string,
  ) {}
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnInit, OnDestroy {

  public list!: QuestionFull[];

  public filteredList!: QuestionFull[];

  public form!: FormGroup;

  public sectionsList: any[] = assocEnumToArray<SectionEnum>(SectionEnum);

  public complexityList: any[] = assocEnumToArray<ComplexityEnum>(ComplexityEnum);

  public statusesList: any[] = assocEnumToArray<StatusEnum>(StatusEnum);

  public displayedColumns = [
    new Column('title', 'Заголовок'),
    new Column('section', 'Раздел'),
    new Column('complexity', 'Сложность'),
    new Column('status', 'Статус'),
  ];

  public selectedItem: QuestionFull | null = null;

  public visibleEditor = false;

  public isCopy = false;

  public learnMode = false;

  private destroy = new Subject<void>();

  constructor(
    private readonly formBuillder: FormBuilder,
    private readonly questionService: QuestionService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.sectionsList.push('ALL');
    this.complexityList.push('ALL');
    this.statusesList.push('ALL');
    this.createForm();
    this.loadList();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public upsertQuestion(): void {
    this.closeEditor();
    this.loadList();
  }

  public selectForLearn(item: QuestionFull): void {
    this.filteredList = [item];
    this.learnMode = true;
    this.changeDetectorRef.markForCheck();
  }

  public selectQuestion(item: QuestionFull | null, isCopy = false): void {
    this.isCopy = isCopy;
    this.selectedItem = item;
    this.visibleEditor = true;
    this.changeDetectorRef.markForCheck();
  }

  public deleteQuestion(question: QuestionFull): void {
    this.questionService
      .delete(question._id)
      .pipe(
        map(() => this.loadList()),
        takeUntil(this.destroy),
      )
      .subscribe();
  }

  public upsertQuest(): void {
    this.loadList();
    this.closeEditor();
  }

  public closeEditor(): void {
    this.visibleEditor = false;
    this.changeDetectorRef.markForCheck();
  }

  private loadList(): void {
    this.questionService
      .loadList()
      .pipe(
        takeUntil(this.destroy),
        map(data => {
          this.list = data;
          this.filterList();
        })
      )
      .subscribe();
  }

  private createForm(): void {
    this.form = this.formBuillder.group({
      status: ['ALL'],
      complexity: ['ALL'],
      section: ['ALL'],
    });

    this.form
      .valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.filterList());
  }

  private filterList(): void {
    const status = this.form.value.status;
    const complexity = this.form.value.complexity;
    const section = this.form.value.section;

    this.filteredList = this.list.filter(item => {
      return (item.parameters.status === status || status === 'ALL') &&
        (item.parameters.complexity === complexity || complexity === 'ALL') &&
        (item.parameters.section === section || section === 'ALL');
    });

    this.changeDetectorRef.markForCheck();
  }

}
