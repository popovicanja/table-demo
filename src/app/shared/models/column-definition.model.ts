import {ColumnType} from '../enums/column-type.enum';

export class ColumnDefinition {
  public name: string;
  public label?: string;
  public type?: ColumnType;
  public formatter?: (value) => any;
  public hidden?: boolean;
  public sortable?: boolean;
  public path?: string[]; // path to display property
  public fullPath?: string[]; // path to display property
  public translated?: boolean; // if true translate pipe is not used
}
