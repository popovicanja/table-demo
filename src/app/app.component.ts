import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _translateService: TranslateService) {
    this._translateService.setDefaultLang('me');
    this._translateService.use('me');
  }

}
