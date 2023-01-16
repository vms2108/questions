import { TitleService } from 'src/app/common/services/title.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {

  private readonly TITLE = 'Вопросики';

  constructor(
    private titleService: TitleService,
    ) {
    this.titleService.setTitle(this.TITLE);
  }
}
