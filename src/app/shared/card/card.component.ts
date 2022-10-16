import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Question } from '../../common/models/question';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  @Input()
  public item!: Question;

  public backSide = false;

  constructor() {}

}
