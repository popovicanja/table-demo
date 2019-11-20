import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * This directive adds CSS class to host element on hover, and removes it once user moves cursor away.
 */
@Directive({
  selector: '[appAddClassOnHover]'
})
export class AddClassOnHoverDirective {

  @Input('appAddClassOnHover') className: string;

  @Input('appAddClassOnHoverDisabled') disabled = false;

  constructor(private _elementRef: ElementRef<HTMLElement>) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.disabled) {
      this._elementRef.nativeElement.classList.add(this.className);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this._elementRef.nativeElement.classList.remove(this.className);
  }

}
