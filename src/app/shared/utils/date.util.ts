import * as moment from 'moment';

export const DB_DATE_FORMAT = 'YYYY-MM-DD';
export const DISPLAY_DATE_FORMAT = 'DD.MM.YYYY';

export class DateUtil {

  static parseDbDate(value: string): Date {
    if (value) {
      return moment(value, DB_DATE_FORMAT).toDate();
    }
    return null;
  }

  static toDbFormat(date: Date): string {
    if (date) {
      return moment(date).format(DB_DATE_FORMAT);
    }
    return null;
  }

  static toDisplayFormat(date: Date): string {
    if (date) {
      return moment(date).format(DISPLAY_DATE_FORMAT);
    }
    return null;
  }

}
