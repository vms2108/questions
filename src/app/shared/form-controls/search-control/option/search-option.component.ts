import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-option',
  templateUrl: './search-option.component.html',
  styleUrls: ['./search-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchOptionComponent {

  @Input()
  public value!: string | null;

  @ViewChild('templateRef', { static: true })
  public readonly templateRef!: TemplateRef<any>;

}
