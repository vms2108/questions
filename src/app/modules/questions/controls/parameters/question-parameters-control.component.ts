import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComplexityEnum } from 'src/app/common/enums/complexity.enum';
import { SectionEnum } from 'src/app/common/enums/section.enum';
import { StatusEnum } from 'src/app/common/enums/status.enum';
import { Question } from 'src/app/common/models/question';
import { assocEnumToArray } from 'src/app/shared/control-base/helpers/assoc-enum-to-array.function';
import { SimpleFormControlBaseComponent } from 'src/app/shared/control-base/simple-form-control.base-component';

@Component({
  selector: 'app-question-parameters-control',
  templateUrl: './question-parameters-control.component.html',
  styleUrls: ['./question-parameters-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuestionParametersControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuestionParametersControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionParametersControlComponent extends SimpleFormControlBaseComponent<Question, Question> {

  public sectionsList: any[] = assocEnumToArray<SectionEnum>(SectionEnum);

  public complexityList: any[] = assocEnumToArray<ComplexityEnum>(ComplexityEnum);

  public statusesList: any[] = assocEnumToArray<StatusEnum>(StatusEnum);

  public form!: FormGroup;

  protected readonly validatorKey = 'app-question-parameters-control';

  private destroy = new Subject<void>();

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
    this.createForm();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [Validators.required]);
  }

  public createValueFromInputData(inputData: Question | null): Question | null {
    return inputData;
  }

  public createInputDataFromValue(value: Question | null): Question | null {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    }

    return value;
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      title: [''],
      blocks: [[]],
      complexity: [null],
      section: [null],
      status: [null],
      counter: [0],
    });

    this.form
      .valueChanges
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(result => {
        this.control.setValue(result);
        this.changeDetectorRef.markForCheck();
      });
  }
}
