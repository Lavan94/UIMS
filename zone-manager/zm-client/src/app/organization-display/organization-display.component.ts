import {Component, OnInit} from '@angular/core';
import {SECTORS} from "../model/DummyData";
import {Complex, Neighborhood, Sector, UrbanZone} from "../model/Organization";
import {PageEvent} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";

const DEFAULT_NEIGHBORHOOD_NAME = 'Neighborhoods';
const DEFAULT_COMPLEX_AND_URBAN_ZONE_NAME: string = 'Complexes & Urban Zones'
const DEFAULT_URBAN_ZONE_NAME = 'Urban Zone';

@Component({
  selector: 'app-organization-display',
  templateUrl: './organization-display.component.html',
  styleUrls: ['./organization-display.component.scss']
})
export class OrganizationDisplayComponent implements OnInit {
  selectedIndex = new FormControl(0);

  sectorList: Sector[] = SECTORS;

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

  ngOnInit(): void {
  }

  handlePageChange($event: PageEvent) {

  }

  clickSector(sector: Sector) {
    this.selectedSectorNeighborhoods = sector.neighborhoods
    this.neighborhoodTabName = sector.name + ' ' + DEFAULT_NEIGHBORHOOD_NAME;
    this.selectedIndex.setValue(1);
    this.neighborhoodDisabled = false;
  }

  handleTabChange(index: any) {
    if (index == 1) {
      this.complexDisabled = true;
      return;
    }
  }

  clickNeighborhood(neighborhood: Neighborhood) {
    this.selectedNeighborhoodComplexes = neighborhood.children
      .filter(child => child instanceof Complex).map(child => child as Complex);
    this.selectedNeighborhoodUrbanZones = neighborhood.children
      .filter(child => child instanceof UrbanZone).map(child => child as UrbanZone);
    this.selectedIndex.setValue(2);
    this.complexAndUrbanZoneTabName = neighborhood.name + ' ' + DEFAULT_COMPLEX_AND_URBAN_ZONE_NAME
    this.complexDisabled = false;
  }

  clickUrbanZone(urbanZone: UrbanZone) {
    this.selectedUrbanZone = urbanZone
    this.urbanZoneDisabled = false
    this.selectedIndex.setValue(3);
    this.urbanZoneTabName = urbanZone.id + ':' + urbanZone.type + ' ' + DEFAULT_URBAN_ZONE_NAME
  }
}
