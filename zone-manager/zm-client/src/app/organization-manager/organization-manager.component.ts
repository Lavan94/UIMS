import { Component } from '@angular/core';
import {Sector} from "../model/Organization/Sector";

@Component({
  selector: 'app-organization-manager',
  templateUrl: './organization-manager.component.html',
  styleUrls: ['./organization-manager.component.scss']
})
export class OrganizationManagerComponent {
  public city: string = "Craiova";
  public selectedOrganizationType: string = Sector.name;

  onSelectedOrganizationTypeChange($event: String) {
    this.selectedOrganizationType = $event.valueOf();
  }
}
