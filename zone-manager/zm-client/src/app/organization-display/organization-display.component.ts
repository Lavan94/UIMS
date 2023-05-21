import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SECTORS} from "../model/DummyData";
import {Complex, Neighborhood, Sector, UrbanZone} from "../model/Organization";
import {FormControl} from "@angular/forms";

const DEFAULT_SECTOR_NAME = 'Sectors';
const DEFAULT_NEIGHBORHOOD_NAME = 'Neighborhoods';
const DEFAULT_COMPLEX_AND_URBAN_ZONE_NAME: string = 'Complexes & Urban Zones'
const DEFAULT_URBAN_ZONE_NAME = 'Overview';

const TAB_NAME_LIST: string[] = [Sector.name, Neighborhood.name, Complex.name, UrbanZone.name];

@Component({
  selector: 'app-organization-display',
  templateUrl: './organization-display.component.html',
  styleUrls: ['./organization-display.component.scss']
})
export class OrganizationDisplayComponent {
  selectedIndex = new FormControl(0);

  sectorList: Sector[] = SECTORS;
  sectorTabName: string = DEFAULT_SECTOR_NAME;

  neighborhoodDisabled: boolean = true;
  neighborhoodTabName: string = DEFAULT_NEIGHBORHOOD_NAME;
  selectedSectorNeighborhoods: Neighborhood[] = [];

  complexDisabled: boolean = true;
  complexAndUrbanZoneTabName = DEFAULT_COMPLEX_AND_URBAN_ZONE_NAME;
  selectedNeighborhoodComplexes: Complex[] = [];
  selectedNeighborhoodUrbanZones: UrbanZone[] = [];

  urbanZoneDisabled: boolean = true;
  urbanZoneTabName = DEFAULT_URBAN_ZONE_NAME;
  selectedUrbanZone: UrbanZone = new UrbanZone();

  @Output() public selectedOrganizationType: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.changeSelectedOrganizationType(Sector.name);
  }

  clickSector(sector: Sector) {
    this.selectedSectorNeighborhoods = sector.neighborhoods
    this.neighborhoodTabName = DEFAULT_NEIGHBORHOOD_NAME;
    this.selectedIndex.setValue(1);
    this.neighborhoodDisabled = false;

    this.complexDisabled = true;
    this.complexAndUrbanZoneTabName = DEFAULT_COMPLEX_AND_URBAN_ZONE_NAME;

    this.urbanZoneDisabled = true;
    this.urbanZoneTabName = DEFAULT_URBAN_ZONE_NAME;

    this.sectorTabName = sector.name;
    this.changeSelectedOrganizationType(Neighborhood.name);
  }

  clickNeighborhood(neighborhood: Neighborhood) {
    this.selectedNeighborhoodComplexes = neighborhood.children
      .filter(child => child instanceof Complex).map(child => child as Complex);
    this.selectedNeighborhoodUrbanZones = neighborhood.children
      .filter(child => child instanceof UrbanZone).map(child => child as UrbanZone);
    this.selectedIndex.setValue(2);
    this.complexAndUrbanZoneTabName = DEFAULT_COMPLEX_AND_URBAN_ZONE_NAME
    this.complexDisabled = false;

    this.urbanZoneDisabled = true;
    this.urbanZoneTabName = DEFAULT_URBAN_ZONE_NAME;
    this.neighborhoodTabName = neighborhood.name
    this.changeSelectedOrganizationType(Complex.name);
  }

  clickUrbanZone(urbanZone: UrbanZone) {
    this.selectedUrbanZone = urbanZone;
    this.urbanZoneDisabled = false;
    this.selectedIndex.setValue(3);
    this.urbanZoneTabName = DEFAULT_URBAN_ZONE_NAME;
    this.complexAndUrbanZoneTabName = urbanZone.id + ':' + urbanZone.type + ' ';
    this.changeSelectedOrganizationType(UrbanZone.name);
  }

  changeSelectedOrganizationType(type: string){
    this.selectedOrganizationType.emit(type);
  }

  changeTab($event: number) {
    this.selectedIndex.setValue($event);
    this.changeSelectedOrganizationType(TAB_NAME_LIST[$event.valueOf()]);
  }
}
