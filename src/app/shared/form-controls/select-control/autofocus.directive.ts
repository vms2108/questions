import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective {

  constructor(private host: ElementRef<HTMLDListElement>) {}

  @Input()
  public set autofocus(params: any) {
    this.host.nativeElement.focus();

  }

}
