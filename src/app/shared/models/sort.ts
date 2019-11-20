import { Sort as MaterialSort } from '@angular/material/sort';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export class Sort {

  constructor(public columnName = 'id', public direction = SortDirection.ASC) { }

  static fromMaterialSort(matSort: MaterialSort): Sort {
    if (matSort.direction) {
      return new Sort(matSort.active, matSort.direction as SortDirection);
    }
    return null;
  }

}
