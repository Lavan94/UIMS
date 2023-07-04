import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Urban_Zone} from "../../../../../../model/Organization/Urban_Zone";
import {Complex} from "../../../../../../model/Organization/Complex";
import {Neighborhood} from "../../../../../../model/Organization/Neighborhood";
import {Sector} from "../../../../../../model/Organization/Sector";
import {Organization} from "../../../../../../model/Organization/Organization";
import {OwnerAuthService} from "../../../../../../service/owner-auth.service";

interface OrganizationDialogData {
  organizationType: string;
  organizationParent: Organization;
  complexOrUrbanZone?: string;
  organizationData?: Organization;
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
  public readonlyData: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditOrganizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrganizationDialogData,
    private ownerAuthService: OwnerAuthService
  ) {
    this.readonlyData = ownerAuthService.getRole() !== 'ADMINISTRATOR'

    this.organizationType = data.organizationParent ? data.organizationType : Sector.name;
    this.complexOrUrbanZone = data.complexOrUrbanZone;
    this.organization = this.getDefaultOrganization();

    if(data.organizationData){
      this.organization = data.organizationData;
      this.organizationType = data.organizationData.constructor.name
      if([Complex.name, Urban_Zone.name].includes(this.organizationType)){
        this.complexOrUrbanZone = this.organizationType;
      }
    }

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
      case Urban_Zone.name:
        return new Urban_Zone();
      default:
        return undefined;
    }
  }
}
