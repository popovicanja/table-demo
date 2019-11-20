import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {MatSort, MatSortHeader, Sort as MaterialSort} from '@angular/material/sort';
import {takeUntil} from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {TableStructure} from '../../models/table-structure.model';
import {ConfirmDialogData} from '../confirm-dialog/confirm-dialog.component';
import {LoaderType} from '../../enums/loader-type.enum';
import {TableRowActionDirective} from '../../directives/table-row-action.directive';
import {TableHeaderSuffixDirective} from '../../directives/table-header-suffix.directive';
import {ColumnType} from '../../enums/column-type.enum';
import {TableCellDefDirective} from '../../directives/table-cell-def.directive';
import {ColumnDefinition} from '../../models/column-definition.model';
import {Sort} from '../../models/sort';
import {Utils} from '../../utils/utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements OnChanges, OnInit, OnDestroy, AfterContentInit {

  @Input() dataSource: BehaviorSubject<T[]>;
  @Input() tableStructure: TableStructure;
  @Input() editButton = true;
  @Input() deleteButton = true;
  @Input() confirmDeleteDialogData: ConfirmDialogData;
  @Input() loading = true;
  @Input() loadingIndicator = LoaderType.PROGRESS_BAR;
  @Input() selectable = false;
  @Input() showActionsOnHover = true;
  @Input() noSort = new Sort();
  @Input() sortable = true;
  data: T[];
  readonly ColumnType = ColumnType;
  readonly LoaderType = LoaderType;
  @ContentChildren(TableCellDefDirective) tableCells: QueryList<TableCellDefDirective>;
  @ContentChildren(TableRowActionDirective) rowActions: QueryList<TableRowActionDirective>;
  @ContentChildren(TableHeaderSuffixDirective) tableHeaderSuffixes: QueryList<TableHeaderSuffixDirective>;
  @ViewChild('columnSelectionList', { static: true }) columnSelectionList: MatSelectionList;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;
  @ViewChildren(MatSortHeader) matSortHeaders: QueryList<MatSortHeader>;
  cellRefs: {[columnName: string]: TemplateRef<any>} = {};
  columnHeaderSuffixRefs: {[columnName: string]: TemplateRef<any>} = {};

  columns: ColumnDefinition[];
  prefix = '';
  godModeActive = false;
  selectionModel = new SelectionModel<T>(true, []);

  @Output() editButtonClick = new EventEmitter<T>();
  @Output() deleteButtonClick = new EventEmitter<T>();
  @Output() refreshButtonClick = new EventEmitter<void>();
  @Output() sort = new EventEmitter<Sort>();
  @Output() selection = new EventEmitter<T[]>();
  @Output() move = new EventEmitter<CdkDragDrop<any>>();

  private _skipNextSort = false;
  private _lastToggledColumnDefinition: ColumnDefinition;
  private destroy$ = new Subject<boolean>();

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.inputPropertyChanged(changes['tableStructure']) && this.tableStructure) {
      this.columns = this.tableStructure.columnDefinitions;
      this.prefix = this.tableStructure.labelPrefix;
    }
  }

  public inputPropertyChanged(change: SimpleChange): boolean {
    return change && change.previousValue !== change.currentValue;
  }

  onCheckboxChange(row: T) {
    this.selectionModel.toggle(row);
    this.selection.emit(this.selectionModel.selected);
  }

  onMasterCheckboxChange() {
    if (this.allSelected()) {
      this.data.forEach(row => this.selectionModel.deselect(row));
    } else {
      this.data.forEach(row => this.selectionModel.select(row));
    }
    this.selection.emit(this.selectionModel.selected);
  }

  allSelected(): boolean {
    return this.selectionModel.selected.length === this.data.length;
  }

  ngOnInit(): void {
    this.dataSource
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.data = data;
        this.selectionModel.clear();
        this._changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngAfterContentInit() {
    this.tableCells.toArray().forEach(tableCell => {
      if (tableCell.cellName) {
        this.cellRefs[tableCell.cellName] = tableCell.templateRef;
      }
    });
    this.tableCells.changes.subscribe(() => {
      this.cellRefs = {};
      this.tableCells.toArray().forEach(tableCell => {
        if (tableCell.cellName) {
          this.cellRefs[tableCell.cellName] = tableCell.templateRef;
        }
      });
      this._changeDetectorRef.detectChanges();
    });
    this.tableHeaderSuffixes.toArray().forEach(suffix => {
      this.columnHeaderSuffixRefs[suffix.columnName] = suffix.templateRef;
    });
    this.tableHeaderSuffixes.changes.subscribe(() => {
      this.columnHeaderSuffixRefs = {};
      this.tableHeaderSuffixes.toArray().forEach(suffix => {
        this.columnHeaderSuffixRefs[suffix.columnName] = suffix.templateRef;
      });
    });
    this.columnSelectionList.selectionChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((change: MatSelectionListChange) => {
        const columnDefinition = change.option.value as ColumnDefinition;
        this._lastToggledColumnDefinition = columnDefinition;
        columnDefinition.hidden = !change.option.selected;
      });
  }

  onSortChange(matSort: MaterialSort) {
    if (!this._skipNextSort) {
      const sort = Sort.fromMaterialSort(matSort) || this.noSort;
      this.sort.emit(sort);
    } else {
      this._skipNextSort = false;
    }
  }

  formatValue(row: T, columnDefinition: ColumnDefinition): any {
    let value = null;
    if (columnDefinition.path) {
      value = Utils.getProperty(row[columnDefinition.name], columnDefinition.path);
    } else if (columnDefinition.fullPath) {
      value = Utils.getProperty(row, columnDefinition.fullPath);
    } else {
      value = row[columnDefinition.name];
    }
    if (columnDefinition.formatter) {
      return columnDefinition.formatter(value);
    }
    return value;
  }

}
