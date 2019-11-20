import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableHeaderSuffix]'
})
export class TableHeaderSuffixDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('appTableHeaderSuffix') columnName: string;

  constructor(public templateRef: TemplateRef<any>) { }

}
