import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogResult } from '../../enums/confirm-dialog-result.enum';

export interface ConfirmDialogData {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

/**
 * Component for displaying confirmation dialog for user's actions.
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  readonly ConfirmDialogResult = ConfirmDialogResult;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

}
