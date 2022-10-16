import { TitleService } from 'src/app/common/services/title.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ik-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {

  private readonly TITLE = 'Index page';

  constructor(
    private titleService: TitleService,
    ) {
    this.titleService.setTitle(this.TITLE);
  }
}
