import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'execute'
})
export class ExecutePipe implements PipeTransform {

  transform<T>(value: T, handler: (arg: T) => any): any {
    return handler(value);
  }

}
