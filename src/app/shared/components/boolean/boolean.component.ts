import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Component for displaying boolean value. If value isn't true or false, **no** icon will be displayed.
 */
@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanComponent {
  @Input() value: boolean;
}
