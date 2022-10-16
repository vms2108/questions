import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'ik-select-search-control',
  templateUrl: './select-search-control.component.html',
  styleUrls: ['./select-search-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSearchControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectSearchControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSearchControlComponent
  extends SimpleFormControlBaseComponent<string | string[], string | string[]>
  implements AfterContentInit, OnChanges, OnDestroy {

  @Input()
  public placeholder: string | null = null;

  @Input()
  public items!: string[];

  @Input()
  public multiple = false;

  @Input()
  public width = 220;

  @Input()
  public defaultOptionText = 'Не найдено';

  @Output()
  public readonly searchChange = new EventEmitter<string>();

  public filteredItems = new ReplaySubject<string[]>(1);

  public searchControl = new FormControl();

  public visibleOptions = true;

  protected readonly validatorKey = 'ik-select-search-control';

  private subject = new Subject<void>();

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public ngAfterContentInit(): void {
    if (!this.items) {
      return;
    }

    if (!this.items.length) {
      this.visibleOptions = false;
    }

    this.filteredItems.next(this.items.slice());

    this.searchControl.valueChanges
      .pipe(takeUntil(this.subject))
      .subscribe(() => {
        this.filterItems();
      });
  }

  public ngOnChanges(): void {
    this.visibleOptions = !!this.items.length;
    this.filteredItems.next(this.items.slice());
  }

  public ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: string | string[] | null): string | string[] | null {
    return inputData;
  }

  public createInputDataFromValue(value: string | string[] | null): string | string[] | null {
    return value;
  }

  private filterItems(): void {
    if (!this.items) {
      return;
    }

    let search = this.searchControl.value;
    if (!search) {
      this.filteredItems.next(this.items.slice());
      return;
    }

    search = search.toLowerCase();
    this.filteredItems.next(
      this.items.filter(item => item.toLowerCase().includes(search)),
    );
  }
}
