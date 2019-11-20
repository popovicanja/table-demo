import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {LoaderState} from '../../models/loader-state';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input() loaderState: LoaderState;
  @Input() overlayOpacity = 0.5;
}
