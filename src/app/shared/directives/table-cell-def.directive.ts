import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableCellDef]'
})
export class TableCellDefDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('appTableCellDef') cellName: string;

  constructor(public templateRef: TemplateRef<any>) { }

}
