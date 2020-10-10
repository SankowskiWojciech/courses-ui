import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class StatusInformationService {

  private readonly SNACK_BAR_CONFIG: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 3000
  };
  private readonly SNACK_BAR_CONFIG_FOR_SUCCESS_RESULT: MatSnackBarConfig = {
    ...this.SNACK_BAR_CONFIG,
    panelClass: ['success-snackbar']
  };
  private readonly SNACK_BAR_CONFIG_FOR_FAILURE_RESULT: MatSnackBarConfig = {
    ...this.SNACK_BAR_CONFIG,
    panelClass: ['failure-snackbar']
  };

  constructor(private statusInformationSnackBar: MatSnackBar) { }

  openSuccessSnackBar(statusInformation: string) {
    this.statusInformationSnackBar.open(statusInformation, '', this.SNACK_BAR_CONFIG_FOR_SUCCESS_RESULT);
  }

  openFailureSnackBar(statusInformation: string) {
    this.statusInformationSnackBar.open(statusInformation, '', this.SNACK_BAR_CONFIG_FOR_FAILURE_RESULT);
  }
}
