import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableRowAction]'
})
export class TableRowActionDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
