import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlockTypeEnum } from 'src/app/common/enums/block-type.enum';
import { Block } from 'src/app/common/models/block';
import { assocEnumToArray } from 'src/app/shared/control-base/helpers/assoc-enum-to-array.function';
import { SimpleFormControlBaseComponent } from 'src/app/shared/control-base/simple-form-control.base-component';

@Component({
  selector: 'app-question-block-control',
  templateUrl: './question-block-control.component.html',
  styleUrls: ['./question-block-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuestionBlockControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuestionBlockControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionBlockControlComponent extends SimpleFormControlBaseComponent<Block, Block> {

  public typesList: any[] = assocEnumToArray<BlockTypeEnum>(BlockTypeEnum);

  public form!: FormGroup;

  protected readonly validatorKey = 'app-question-block-control';

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

  public createValueFromInputData(inputData: Block | null): Block | null {
    return inputData;
  }

  public createInputDataFromValue(value: Block | null): Block | null {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    }

    return value;
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      type: [null],
      text: [''],
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
