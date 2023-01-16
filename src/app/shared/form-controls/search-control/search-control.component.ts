import { SPACE } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { defer } from 'lodash';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { ChangeEventFn, defaultChangeEventFn, defaultTouchEventFn, TouchEventFn } from './../../control-base/helpers/control-value-accessor.defaults';

@Component({
  selector: 'app-search-control',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchControlComponent implements OnInit, OnDestroy {

  @Input()
  public placeholderLabel = 'Поиск';

  @Input()
  public noEntriesFoundLabel = 'Не найдено';

  @Input()
  public width = 220;

  @Output()
  public searchChange = new EventEmitter<string | null>();

  @ViewChild('searchSelectInput', { read: ElementRef, static: true })
  public searchSelectInput!: ElementRef;

  public options!: QueryList<MatOption>;

  public onChange: ChangeEventFn<string> = defaultChangeEventFn;

  public onTouched: TouchEventFn =  defaultTouchEventFn;

  protected readonly validatorKey = 'app-search-control';

  private previousSelectedValues!: any[];

  private onDestroy = new Subject<void>();

  private newValue!: string | null;

  constructor(
    @Inject(MatSelect) public matSelect: MatSelect,
    private changeDetectorRef: ChangeDetectorRef,
    ) {
  }

  get value(): string | null {
    return this.newValue;
  }

  public ngOnInit(): void {
    this.focusSubscription();
    this.optionsSubscription();
    this.initMultipleHandling();
  }

  public ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  public handleKeydown(event: KeyboardEvent): void {
    if (SPACE) {
      event.stopPropagation();
    }
  }

  public writeValue(value: string | null): void {
    const valueChanged = value !== this.newValue;
    if (valueChanged) {
      this.newValue = value;
    }
  }

  public onInputChange(value: string): void {
    const valueChanged = value !== this.newValue;
    if (valueChanged) {
      this.newValue = value;
      this.onChange(value);
      this.searchChange.emit(value);
    }
  }

  public onBlur(value: string): void {
    this.writeValue(value);
    this.onTouched();
  }

  public registerOnChange(fn: ChangeEventFn<string>): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: TouchEventFn): void {
    this.onTouched = fn;
  }

  public focus(): void {
    if (!this.searchSelectInput) {
      return;
    }

    const panel = this.matSelect.panel.nativeElement;
    const scrollTop = panel.scrollTop;
    this.searchSelectInput.nativeElement.focus();
    panel.scrollTop = scrollTop;
  }

  public reset(focus?: boolean): void {
    if (!this.searchSelectInput) {
      return;
    }
    this.searchSelectInput.nativeElement.value = '';
    this.onInputChange('');

    if (focus) {
      this.focus();
    }
  }

  private optionsSubscription(): void {
    this.matSelect.openedChange
      .pipe(take(1))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.changeOptions();
      });
  }

  private changeOptions(): void {
    this.options = this.matSelect.options;
    this.options.changes
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        const keyManager = this.matSelect._keyManager;
        this.changeDetectorRef.markForCheck();

        if (keyManager && this.matSelect.panelOpen) {
          defer(() => {
            keyManager.setFirstItemActive();
          });
        }
      });
  }

  private focusSubscription(): void {
    this.matSelect.openedChange
      .pipe(takeUntil(this.onDestroy))
      .subscribe(opened => {
        if (opened) {
          this.focus();
        } else {
          this.reset();
        }
      });
  }

  private initMultipleHandling(): void {
    this.matSelect.valueChange
      .pipe(takeUntil(this.onDestroy))
      .subscribe(values => {
        let items = values;
        if (this.matSelect.multiple) {
          let restoreSelectedValues = false;

          if (this.value && this.value.length
            && this.previousSelectedValues && Array.isArray(this.previousSelectedValues)) {
            if (!items || !Array.isArray(items)) {
              items = [];
            }

            const optionValues = this.matSelect.options.map(option => option.value);
            this.previousSelectedValues.forEach(previousValue => {
              if (!items.includes(previousValue) && !optionValues.includes(previousValue)) {
                items.push(previousValue);
                restoreSelectedValues = true;
              }

            });
          }

          if (restoreSelectedValues) {
            this.matSelect._onChange(items);
          }

          this.previousSelectedValues = items;
        }
      });
  }

}
