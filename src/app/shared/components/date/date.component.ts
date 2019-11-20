import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import {DateUtil} from '../../utils/date.util';

/**
 * Component for displaying Date value.
 */
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateComponent implements OnChanges {

  @Input() value: Date;
  displayValue: string;

  ngOnChanges(): void {
    this.displayValue = DateUtil.toDisplayFormat(this.value);
  }

}
