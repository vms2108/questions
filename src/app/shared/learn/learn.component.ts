import { ChangeDetectionStrategy, Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Question } from 'src/app/common/models/question';
import { QuestionFull } from 'src/app/common/models/question-full';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnComponent implements OnChanges {

  @Input()
  public list!: QuestionFull[];

  public selectedItem!: Question;

  public showAnswer = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnChanges(): void {
    if (this.list.length) {
      this.getSelectedItem();
    }
  }

  public nextRandom(): void {
    this.getSelectedItem();
  }

  public stringFromJSON(str: string): string {
    const json = JSON.parse(str);
    return JSON.stringify(json, undefined, 2);
  }

  private getSelectedItem(): void {
    this.selectedItem = this.list[Math.floor(Math.random() * this.list.length)].parameters;
    this.showAnswer = false;
    this.changeDetectorRef.markForCheck();
  }
}
