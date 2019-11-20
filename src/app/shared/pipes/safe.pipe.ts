import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({name: 'safeResourceUrl'})
export class SafeResourceUrlPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer) { }

  transform(value: any): SafeResourceUrl {
    return value ? this._domSanitizer.bypassSecurityTrustResourceUrl(value) : '';
  }

}
