import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Block } from 'src/app/common/models/block';
import { SimpleFormControlBaseComponent } from 'src/app/shared/control-base/simple-form-control.base-component';

@Component({
  selector: 'app-question-blocks-control',
  templateUrl: './question-blocks-control.component.html',
  styleUrls: ['./question-blocks-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuestionBlocksControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuestionBlocksControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionBlocksControlComponent extends SimpleFormControlBaseComponent<Block[], Block[]> {

  @Input()
  public label!: string;

  protected readonly validatorKey = 'app-question-blocks-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [Validators.required]);
  }

  public createValueFromInputData(inputData: Block[] | null): Block[] | null {
    return inputData;
  }

  public createInputDataFromValue(value: Block[] | null): Block[] | null {
    return value;
  }

  public initialItemValue = () => null;

}
