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

  public lastSelectedOrganizationDisplayEvent?: MapOrganizationEvent;
  public lastNavigatedMapOrganizationEvent: MapOrganizationEvent | null = null;

  onEnableComplexUrbanZoneSelector($event: any){
    this.enableComplexUrbanZoneSelector = $event.valueOf();
  }

  onSelectedOrganizationDisplayEmitEvent($event: MapOrganizationEvent) {
    this.lastSelectedOrganizationDisplayEvent = $event;
  }

  onNavigatedOrganization($event: MapOrganizationEvent) {
    this.lastNavigatedMapOrganizationEvent = $event
  }
}
