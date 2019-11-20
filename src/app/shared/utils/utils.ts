export type CompareFn<T> = (arg1: T, arg2: T) => boolean;

export class FilterFnOptions {
  caseSensitive?: boolean;
  startsWith?: boolean;
  constructor() {
    this.caseSensitive = false;
    this.startsWith = false;
  }
}

export class Utils {

  /**
   * Returns duplicate-free version of the array
   * @param array array to remove duplicates from
   * @param compareWith function for determining if two elements of the array are the same
   */
  static unique<T>(array: T[], compareWith?: CompareFn<T>): T[] {
    const copy = [];
    if (!compareWith) {
      for (let i = 0; i < array.length; i++) {
        if (copy.indexOf(array[i]) === -1) {
          copy.push(array[i]);
        }
      }
      return copy;
    }
    for (let i = 0; i < array.length; i++) {
      if (copy.findIndex(e => compareWith(e, array[i])) === -1) {
        copy.push(array[i]);
      }
    }
    return copy;
  }

  static filter<T>(array: T[], value: string, property: string | string[], options = new FilterFnOptions()): T[] {
    const {caseSensitive, startsWith} = options;
    if (!value) {
      value = '';
    }
    return array.filter(element => {
      let elementProperty = null;
      if (!property) {
        elementProperty = element;
      } else if (typeof property === 'string') {
        elementProperty = element[property] as string;
      } else {
        elementProperty = Utils.getProperty(element, property) as string;
      }
      if (caseSensitive) {
        if (startsWith) {
          return elementProperty.indexOf(value) === 0;
        } else {
          return elementProperty.indexOf(value) !== -1;
        }
      } else {
        if (startsWith) {
          return elementProperty.toLowerCase().indexOf(value.toLowerCase()) === 0;
        } else {
          return elementProperty.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        }
      }
    });
  }

  static getProperty(object: any, propertyPath: string[]) {
    if (object) {
      let value = object;
      for (let i = 0; i < propertyPath.length; i++) {
        value = value[propertyPath[i]];
        if (!value) {
          break;
        }
      }
      return value;
    }
    return null;
  }

  static setProperty(object: any, propertyPath: string[], v: any) {
    if (object) {
      let value = object;
      for (let i = 0; i < propertyPath.length - 1; i++) {
        value = value[propertyPath[i]];
        if (!value) {
          return;
        }
      }
      if (value) {
        value[propertyPath[propertyPath.length - 1]] = v;
      }
    }
  }

}
