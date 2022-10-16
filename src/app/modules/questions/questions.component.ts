import { StatusEnum } from './../../common/enums/status.enum';
import { ComplexityEnum } from './../../common/enums/complexity.enum';
import { SectionEnum } from './../../common/enums/section.enum';
import { takeUntil } from 'rxjs/operators';
import { QUESTIONS } from './common/constants/questions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { assocEnumToArray } from 'src/app/shared/control-base/helpers/assoc-enum-to-array.function';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  public readonly QUESTIONS_LIST = QUESTIONS;

  public filteredList = this.QUESTIONS_LIST;

  public form!: FormGroup;

  public sectionsList: any[] = assocEnumToArray<SectionEnum>(SectionEnum);

  public complexityList: any[] = assocEnumToArray<ComplexityEnum>(ComplexityEnum);

  public statusesList: any[] = assocEnumToArray<StatusEnum>(StatusEnum);

  private destroy = new Subject<void>();

  constructor(
    private readonly formBuillder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.sectionsList.push('ALL');
    this.complexityList.push('ALL');
    this.statusesList.push('ALL');
    this.createForm();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
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
      .subscribe(() => this.filterList())
  }

  private filterList(): void {
    const status = this.form.value.status;
    const complexity = this.form.value.complexity;
    const section = this.form.value.section;

    this.filteredList = this.QUESTIONS_LIST.filter(item => {
      return (item.status === status || status === 'ALL') &&
        (item.complexity === complexity || complexity === 'ALL') &&
        (item.section === section || section === 'ALL');
    });
  }

}
