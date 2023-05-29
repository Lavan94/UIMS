import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UrbanZone} from "../../model/Organization/UrbanZone";
import {Complex} from "../../model/Organization/Complex";
import {Neighborhood} from "../../model/Organization/Neighborhood";
import {Sector} from "../../model/Organization/Sector";
import {Organization} from "../../model/Organization/Organization";

interface OrganizationDialogData {
  organizationType: string;
  organizationParent: Organization;
  complexOrUrbanZone?: string;
}

@Component({
  selector: 'app-add-edit-organization-dialog',
  templateUrl: './add-edit-organization-dialog.component.html',
  styleUrls: ['./add-edit-organization-dialog.component.scss']
})
export class AddEditOrganizationDialogComponent {
  public organizationType: string = Sector.name;
  public organization?: any;
  public complexOrUrbanZone?: string;

  constructor(
    public dialogRef: MatDialogRef<AddEditOrganizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrganizationDialogData) {
    this.organizationType = data.organizationType;
    this.complexOrUrbanZone = data.complexOrUrbanZone;
    this.organization = this.getDefaultOrganization();

    if(this.organization){
      this.organization.parent = data.organizationParent;
    }
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
