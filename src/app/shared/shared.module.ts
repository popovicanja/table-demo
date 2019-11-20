import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSidenavModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatIconModule,
  MatSortModule,
  MatSelectModule,
  MatListModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDialogModule,
  MatNativeDateModule,
  MatTabsModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatStepperModule,
  MatButtonToggleModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  DateAdapter,
} from '@angular/material';
import {CommonModule, CurrencyPipe, DatePipe, TitleCasePipe} from '@angular/common';
import {TableComponent} from './components/table/table.component';
import {TimeAgoPipe} from './pipes/time-ago.pipe';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './components/loader/loader.component';
import {NgModule} from '@angular/core';
import {StopClickPropagationDirective} from './directives/stop-click-propagation.directive';
import {TableRowActionDirective} from './directives/table-row-action.directive';
import {ExecuteWithArgsPipe} from './pipes/execute-with-args.pipe';
import {SafeResourceUrlPipe} from './pipes/safe.pipe';
import {DateComponent} from './components/date/date.component';
import {RouterModule} from '@angular/router';
import {ConfirmClickDirective} from './directives/confirm-click.directive';
import {ExecutePipe} from './pipes/execute.pipe';
import {TableHeaderSuffixDirective} from './directives/table-header-suffix.directive';
import {TableCellDefDirective} from './directives/table-cell-def.directive';
import {AddClassOnHoverDirective} from './directives/add-class-on-hover.directive';
import {OverlayComponent} from './components/overlay/overlay.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {TranslateModule} from '@ngx-translate/core';
import {BooleanComponent} from './components/boolean/boolean.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSortModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatStepperModule,
    MatButtonToggleModule,
    TranslateModule,
  ],
  declarations: [
    // components:
    TableComponent,
    ConfirmDialogComponent,
    DateComponent,
    PaginatorComponent,
    OverlayComponent,
    LoaderComponent,
    BooleanComponent,
    // directives:
    AddClassOnHoverDirective,
    StopClickPropagationDirective,
    ConfirmClickDirective,
    TableCellDefDirective,
    TableRowActionDirective,
    TableHeaderSuffixDirective,
    // pipes:
    SafeResourceUrlPipe,
    ExecutePipe,
    TimeAgoPipe,
    ExecuteWithArgsPipe,
  ],
  exports: [
    // modules:
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatStepperModule,
    MatButtonToggleModule,
    TranslateModule,
    // components:
    TableComponent,
    ConfirmDialogComponent,
    DateComponent,
    PaginatorComponent,
    OverlayComponent,
    LoaderComponent,
    BooleanComponent,
    // directives:
    AddClassOnHoverDirective,
    StopClickPropagationDirective,
    ConfirmClickDirective,
    TableCellDefDirective,
    TableRowActionDirective,
    TableHeaderSuffixDirective,
    // pipes:
    SafeResourceUrlPipe,
    ExecutePipe,
    TimeAgoPipe,
    ExecuteWithArgsPipe,
  ],
  providers: [
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_LOCALE, useValue: 'sr-Latn'},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ]
})
export class SharedModule { }
