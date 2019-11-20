// tslint:disable:no-input-rename
import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ConfirmDialogComponent, ConfirmDialogData} from '../components/confirm-dialog/confirm-dialog.component';
import {ConfirmDialogResult} from '../enums/confirm-dialog-result.enum';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

/**
 * This directive opens a confirmation dialog when click event is fired on its host element.
 * If dialog is closed with result {@link ConfirmDialogResult.CONFIRM}, directive emits {@link confirmClick} event.
 * Important: This directive doesn't cancel click events on its host element, and any event handlers attached to this event
 * will execute right after {@link onClick} function (they won't wait for user to close the confirm dialog).
 */
@Directive({
  selector: '[appConfirmClick]'
})
export class ConfirmClickDirective {

  @Input('appConfirmDialogData') confirmDialogData: ConfirmDialogData;

  @Input('appSkipConfirm') skipConfirm = false;

  /** Event which gets fired when user closes confirmation dialog with result {@link ConfirmDialogResult.CONFIRM} */
  @Output() confirmClick = new EventEmitter();

  constructor(private _matDialog: MatDialog) { }

  /** Function which gets executed when user clicks on host element. (This opens up confirmation dialog) */
  @HostListener('click') onClick() {
    if (this.skipConfirm) {
      this.confirmClick.emit();
      return;
    }
    const config: MatDialogConfig<ConfirmDialogData> = {autoFocus: false};
    if (this.confirmDialogData) {
      config.data = this.confirmDialogData;
    }
    const dialogRef: MatDialogRef<ConfirmDialogComponent, ConfirmDialogResult> = this._matDialog.open(ConfirmDialogComponent, config);
    const subscription = dialogRef.afterClosed().subscribe(result => {
      if (result === ConfirmDialogResult.CONFIRM) {
        this.confirmClick.emit();
      }
      subscription.unsubscribe();
    });
  }

}
