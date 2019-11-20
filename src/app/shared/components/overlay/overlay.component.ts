import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: '',
  styles: [`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-transition: background-color 250ms linear;
      -moz-transition: background-color 250ms linear;
      -o-transition: background-color 250ms linear;
      -ms-transition: background-color 250ms linear;
      transition: background-color 250ms linear;
    }
  `]
})
export class OverlayComponent {
  @Input() @HostBinding('style.opacity') opacity = 0.5;
  @Input() @HostBinding('style.background') background = 'white';
  @Input() @HostBinding('style.z-index') zIndex: string | number = 'auto';
}
