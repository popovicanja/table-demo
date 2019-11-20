import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {TableStructure} from '../shared/models/table-structure.model';
import {Sort} from '../shared/models/sort';
import {PaginatorComponent} from '../shared/components/paginator/paginator.component';
import {LoaderState} from '../shared/models/loader-state';
import {ConfirmDialogData} from '../shared/components/confirm-dialog/confirm-dialog.component';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {finalize, map, switchMap, takeUntil} from 'rxjs/operators';
import {Page} from '../shared/models/page';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {HttpStatus} from '../shared/enums/http-status';
import {Gender} from '../models/gender.enum';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnDestroy {

  page = new Page();
  sort = new Sort();
  totalElements = 0;
  dataSource$: Observable<User[]>;
  tableStructure: TableStructure;
  confirmDeleteDialogData: ConfirmDialogData;
  loaderState = new LoaderState();
  @ViewChild(PaginatorComponent, { static: true }) paginator: PaginatorComponent;
  private _loadData$: BehaviorSubject<null> = new BehaviorSubject(null);
  private _numberOfElements: number;
  private destroy$ = new Subject<boolean>();

  constructor(
    private _translateService: TranslateService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _userService: UserService,
    private _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this._initData();
    this.dataSource$ = this._loadData$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        this._showLoader();
        return this._userService.getAll(this.page, this.sort).pipe(
          finalize(() => this._hideLoader()),
          map(response => {
            this.totalElements = response.totalElements;
            this._numberOfElements = response.content.length;
            return response.content;
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onPageChange(page: Page) {
    this.page = page;
    this.loadData();
  }

  onSortChange(sort: Sort) {
    this.sort = sort;
    this.loadData();
  }

  onDeleteButtonClick(user: User) {
    this._showLoader();
    this._userService.delete(user)
      .pipe(finalize(() => this._hideLoader()))
      .subscribe(response => {
        if (response.status === HttpStatus.OK) {
          const message = this._translateService.instant('user.snackbar.delete-success');
          this._matSnackBar.open(message, 'OK', {duration: 2000});
          if (this._numberOfElements === 1 && this.page.pageIndex > 1) {
            this.paginator.previous();
          } else {
            this.loadData();
          }
        }
      });
  }

  loadData() {
    this._loadData$.next(null);
  }

  private _initData() {
    this.confirmDeleteDialogData = {message: `user.dialog.confirm-delete`};
    this._setTableStructure();
  }

  private _setTableStructure() {
    this.tableStructure = new TableStructure([
      {name: 'username', label: 'username', sortable: true},
      {name: 'email', label: 'email'},
      {name: 'first_name', label: 'first-name', sortable: true},
      {name: 'last_name', label: 'last-name', sortable: true},
      {name: 'gender', label: 'gender', formatter: gender => this._translateGender(gender)},
      {name: 'state_code', label: 'state-code', sortable: true},
      {name: 'city', label: 'city', sortable: true},
      {name: 'phone', label: 'phone', sortable: false},
    ], `user.columns.`);
  }

  private _translateGender(gender: Gender): string {
    return this._translateService.instant(`gender.${gender}`);
  }

  private _hideLoader() {
    this.loaderState = this.loaderState.hideLoader();
    this._changeDetectorRef.detectChanges();
  }

  private _showLoader() {
    this.loaderState = this.loaderState.showLoader();
    this._changeDetectorRef.detectChanges();
  }

}
