import { Component } from '@angular/core';
import {Sector} from "../model/Organization/Sector";
import {MapOrganizationEvent} from "./event/MapOrganizationEvent";

@Component({
  selector: 'app-organization-manager',
  templateUrl: './organization-manager.component.html',
  styleUrls: ['./organization-manager.component.scss']
})
export class OrganizationManagerComponent {
  public city: string = "Craiova";
  public enableComplexUrbanZoneSelector: boolean = false;
  public lastMapOrganizationManagerEvent?: MapOrganizationEvent;

  public mapSelectedSector: Sector | null = null;

  onEnableComplexUrbanZoneSelector($event: any){
    this.enableComplexUrbanZoneSelector = $event.valueOf();
  }

  navigatedSectorEvent($event: Sector) {
    this.mapSelectedSector = $event
  }

  onSelectedOrganizationEmitEvent($event: MapOrganizationEvent) {
    this.lastMapOrganizationManagerEvent = $event;
  }
}
