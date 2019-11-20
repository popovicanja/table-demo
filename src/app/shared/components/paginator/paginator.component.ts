import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Page} from '../../models/page';
import {distinctUntilChanged, skip, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {

  static readonly DEFAULT_PAGE_SIZE_OPTIONS = [1, 3, 5, 10, 15, 20];

  @Input() set totalElements(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    this._totalElements = value;
    this._updateNumberOfPages();
    this._updateFirstAndLastItemIndex();
  }

  /** Total number of element across all pages */
  get totalElements(): number {
    return this._totalElements;
  }

  /** Array of page size options. If not provided {@link DEFAULT_PAGE_SIZE_OPTIONS} will be used */
  @Input() pageSizeOptions: number[];
  /** Emits {@link Page} object each time page index or page size changes */
  @Output() pageChange = new EventEmitter<Page>();
  /** Total number of pages */
  numberOfPages = 1;
  /** Index (in the array of all elements) of the first element in the table */
  firstItemIndex = 0;
  /** Index (in the array of all elements) of the last element in the table */
  lastItemIndex = 0;
  /** Object representing current state of the paginator */
  page = new Page();
  /** Array of all page indexes. It's always an array of all integers between 1 and {@link numberOfPages} */
  pageIndexOptions: number[] = [];
  /** FormGroup for changing state of the paginator */
  form: FormGroup;

  private _totalElements = 0;
  private _previousPage = new Page();

  ngOnInit() {
    if (!this.pageSizeOptions) {
      this.pageSizeOptions = PaginatorComponent.DEFAULT_PAGE_SIZE_OPTIONS;
    }
    this._initializeForm();
    this._pageSizeControl.valueChanges
      .pipe(
        startWith(this._pageSizeControl.value),
        distinctUntilChanged(),
        skip(1)
      )
      .subscribe(this._onPageSizeValueChange);
    this._pageIndexControl.valueChanges
      .pipe(
        startWith(this._pageIndexControl.value),
        distinctUntilChanged(),
        skip(1)
      )
      .subscribe(this._onPageIndexValueChange);
  }

  /** Decrement page index */
  previous() {
    this.page.pageIndex--;
    this.form.patchValue(this.page);
  }

  /** Increment page index */
  next() {
    this.page.pageIndex++;
    this.form.patchValue(this.page);
  }

  /** Set page index to 1 */
  first() {
    this.page.pageIndex = 1;
    this.form.patchValue(this.page);
  }

  /** Set page index to {@link numberOfPages} */
  last() {
    this.page.pageIndex = this.numberOfPages;
    this.form.patchValue(this.page);
  }

  /**
   * This function is called each time user changes page index.
   * Input field for page index can be of type MatSelectComponent, {@link HTMLSelectElement} or {@link HTMLInputElement},
   * depending on {@link numberOfPages} (for performance reasons)
   *
   * {@param pageIndex} will be of type string if native <select> tag is used,
   * even though ${@link pageIndexOptions} is always an array of numbers.
   * This is because value of native select element - {@link HTMLSelectElement#value} is always string,
   * and anything we pass to it will be cast to string.
   */
  private _onPageIndexValueChange = (pageIndex: number | string) => {
    // this can happen if page index input field is HTMLInputElement with type="number" and user entered '' or '-'
    if (pageIndex === null) {
      return;
    }
    if (typeof pageIndex === 'number') {
      // check if page index is out of bounds (only possible if HTMLInputElement is used)
      if (pageIndex > this.numberOfPages) {
        pageIndex = this.numberOfPages;
        this._pageIndexControl.setValue(pageIndex);
        return;
      }
      if (pageIndex < 1) {
        pageIndex = 1;
        this._pageIndexControl.setValue(pageIndex);
        return;
      }
    }
    this.page.pageIndex = +pageIndex;
    this._updateNumberOfPages();
    this._updateFirstAndLastItemIndex();
    this._emitPageChange();
  }

  /** This function is called each time user changes page size */
  private _onPageSizeValueChange = (pageSize: number) => {
    this.page.pageSize = pageSize;
    this._updateNumberOfPages();
    if (this.numberOfPages < this.page.pageIndex) {
      this.page.pageIndex = this.numberOfPages;
      this._pageIndexControl.setValue(this.page.pageIndex, {emitEvent: false});
      this._updateFirstAndLastItemIndex();
    } else {
      this.page.pageIndex = Math.max(Math.ceil(this.firstItemIndex / this.page.pageSize), 1);
      this._pageIndexControl.setValue(this.page.pageIndex, {emitEvent: false});
      this._updateFirstAndLastItemIndex();
    }
    this._emitPageChange();
  }

  private _initializeForm() {
    this.form = new FormGroup({
      pageIndex: new FormControl(this.page.pageIndex),
      pageSize: new FormControl(this.page.pageSize)
    });
  }

  private _emitPageChange() {
    const page = Object.assign(new Page(), this.page);
    if (JSON.stringify(page) !== JSON.stringify(this._previousPage)) {
      this.pageChange.emit(page);
      this._previousPage = Object.assign(new Page(), page);
    }
  }

  private _updateNumberOfPages() {
    this.numberOfPages = Math.max(Math.ceil(this._totalElements / this.page.pageSize), 1);
    this.pageIndexOptions = Array.from({length: this.numberOfPages}, (x, i) => i + 1);
  }

  private _updateFirstAndLastItemIndex() {
    if (this.totalElements > 0) {
      this.firstItemIndex = (this.page.pageSize * this.page.pageIndex) - this.page.pageSize + 1;
      this.lastItemIndex = Math.min(this.firstItemIndex + this.page.pageSize - 1, this.totalElements);
    } else {
      this.firstItemIndex = 0;
      this.lastItemIndex = 0;
    }
  }

  private get _pageIndexControl(): FormControl {
    return this.form.get('pageIndex') as FormControl;
  }

  private get _pageSizeControl(): FormControl {
    return this.form.get('pageSize') as FormControl;
  }

}
