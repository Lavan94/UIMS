import { Component } from '@angular/core';
import {Sector} from "../model/Organization/Sector";
import {Organization} from "../model/Organization/Organization";
import {Neighborhood} from "../model/Organization/Neighborhood";
import {Complex} from "../model/Organization/Complex";
import {UrbanZone} from "../model/Organization/UrbanZone";

@Component({
  selector: 'app-organization-manager',
  templateUrl: './organization-manager.component.html',
  styleUrls: ['./organization-manager.component.scss']
})
export class OrganizationManagerComponent {
  public city: string = "Craiova";
  public selectedOrganizationType: string = Sector.name;
  public selectedOrganizationValue: Map<string, Organization | null> = new Map<string, Organization | null>([
    [Sector.name, null],
    [Neighborhood.name, null],
    [Complex.name, null],
    [UrbanZone.name, null],
  ]);

  onSelectedOrganizationTypeChange($event: string) {
    this.selectedOrganizationType = $event.valueOf();
  }

  onSelectedOrganizationValueChange($event: any) {
    this.selectedOrganizationValue = $event.valueOf();
  }
}
