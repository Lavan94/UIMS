import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface OrganizationDialogData {
  organizationType: string;
}

@Component({
  selector: 'app-add-organization-dialog',
  templateUrl: './add-organization-dialog.component.html',
  styleUrls: ['./add-organization-dialog.component.scss']
})
export class AddOrganizationDialogComponent {
  public organizationType: string = '';
  constructor(
    public dialogRef: MatDialogRef<AddOrganizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrganizationDialogData) {
    this.organizationType = data.organizationType;
  }
}
