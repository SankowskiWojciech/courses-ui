import { MatSnackBarConfig } from '@angular/material/snack-bar';

const SNACK_BAR_CONFIG: MatSnackBarConfig = {
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
  duration: 3000
};

export const SNACK_BAR_CONFIG_FOR_SUCCESS_RESULT: MatSnackBarConfig = {
  ...SNACK_BAR_CONFIG,
  panelClass: ['success-snackbar']
};

export const SNACK_BAR_CONFIG_FOR_FAILURE_RESULT: MatSnackBarConfig = {
  ...SNACK_BAR_CONFIG,
  panelClass: ['failure-snackbar']
};
