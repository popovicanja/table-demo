import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'executeWithArgs'
})
export class ExecuteWithArgsPipe implements PipeTransform {

  transform(fn: (...args: any[]) => any, ...args: any[]): any {
    return fn(...args);
  }

}
