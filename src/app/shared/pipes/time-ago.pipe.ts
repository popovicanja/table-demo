import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeAgo'})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date): string {
    const now = new Date().getTime();
    // time since message was sent in seconds
    const delta = (now - value.getTime()) / 1000;
    // format string
    if (delta < 60) { // sent in last minute
      return `${Math.floor(delta)}s`;
    } else if (delta < 3600) { // sent in last hour
      return `${Math.floor(delta / 60)}m`;
    } else if (delta < 86400) { // sent on last day
      return `${Math.floor(delta / 3600)}h`;
    } else { // sent more than one day ago
      return `${Math.floor(delta / 86400)}d`;
    }
  }

}
