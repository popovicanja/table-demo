import {ColumnDefinition} from './column-definition.model';

export class TableStructure {

  public columnDefinitions: ColumnDefinition[];
  public labelPrefix?: string;

  constructor(columnDefinitions: ColumnDefinition[], labelPrefix?: string) {
    this.columnDefinitions = columnDefinitions.map(def => Object.assign(new ColumnDefinition(), def));
    this.labelPrefix = labelPrefix;
  }

}
