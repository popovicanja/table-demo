import { Directive, HostListener } from '@angular/core';

/**
 * This directive stops propagation of click events on it's host element.
 */
@Directive({
  selector: '[appStopClickPropagation]'
})
export class StopClickPropagationDirective {
  @HostListener('click', ['$event'])
  public onClick(event: any) {
    event.stopPropagation();
  }
}
