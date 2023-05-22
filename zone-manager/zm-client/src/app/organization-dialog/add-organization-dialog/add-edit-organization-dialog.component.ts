import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Complex, Neighborhood, Sector, UrbanZone} from 'src/app/model/Organization';

interface OrganizationDialogData {
  organizationType: string;
}

@Component({
  selector: 'app-add-edit-organization-dialog',
  templateUrl: './add-edit-organization-dialog.component.html',
  styleUrls: ['./add-edit-organization-dialog.component.scss']
})
export class AddEditOrganizationDialogComponent {
  public organizationType: string = Sector.name;
  public organization?: any;

  constructor(
    public dialogRef: MatDialogRef<AddEditOrganizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrganizationDialogData) {
    this.organizationType = data.organizationType;
    this.organization = this.getDefaultOrganization();
  }

  public getDefaultOrganization(){
    switch (this.organizationType){
      case Sector.name:
        return new Sector();
      case Neighborhood.name:
        return new Neighborhood();
      case Complex.name:
        return new Complex();
      case UrbanZone.name:
        return new UrbanZone();
      default:
        return undefined;
    }
  }
}
