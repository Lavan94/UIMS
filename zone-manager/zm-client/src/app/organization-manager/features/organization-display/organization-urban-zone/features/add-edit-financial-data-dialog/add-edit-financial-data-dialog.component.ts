import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FinancialData} from "../../../../../../model/FinancialData";
import {OwnerAuthService} from "../../../../../../service/owner-auth.service";

@Component({
  selector: 'app-add-edit-financial-data-dialog',
  templateUrl: './add-edit-financial-data-dialog.component.html',
  styleUrls: ['./add-edit-financial-data-dialog.component.scss']
})
export class AddEditFinancialDataDialogComponent {
  public currentFinancialData: FinancialData
  public role: string = "OWNER"
  constructor(
    public dialogRef: MatDialogRef<AddEditFinancialDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FinancialData,
    ownerAuthService: OwnerAuthService
  ) {
    this.currentFinancialData = data ? data : new FinancialData();
    this.role = ownerAuthService.getRole();
  }

}
