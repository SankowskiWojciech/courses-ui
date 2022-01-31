import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_CONFIG_FOR_FAILURE_RESULT, SNACK_BAR_CONFIG_FOR_SUCCESS_RESULT } from '../constants/status-information-configuration.constant';

@Injectable({
  providedIn: 'root'
})
export class StatusInformationService {

  constructor(private statusInformationSnackBar: MatSnackBar) { }

  openSuccessSnackBar(statusInformation: string) {
    this.statusInformationSnackBar.open(statusInformation, '', SNACK_BAR_CONFIG_FOR_SUCCESS_RESULT);
  }

  openFailureSnackBar(statusInformation: string) {
    this.statusInformationSnackBar.open(statusInformation, '', SNACK_BAR_CONFIG_FOR_FAILURE_RESULT);
  }
}
