import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {SECTORS} from "../model/DummyData";
import {FormControl} from "@angular/forms";
import {OrganizationService} from "../organization-service/organization.service";
import {UrbanZone} from "../model/Organization/UrbanZone";
import {Complex} from "../model/Organization/Complex";
import {Neighborhood} from "../model/Organization/Neighborhood";
import {Sector} from "../model/Organization/Sector";
import {Organization} from "../model/Organization/Organization";
import {MatListOption} from "@angular/material/list";

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
export class OrganizationDisplayComponent implements OnInit {
  selectedIndex = new FormControl(0);

  sectorList: Sector[] = [];
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

  private _mapSelectedSector: Sector | null = null;

  @ViewChildren('sectorElem') sectorElements?: QueryList<MatListOption>;

  @Input() set mapSelectedSector(sector: Sector | null) {
    console.log(sector)
    this._mapSelectedSector = sector;
    if (sector) {
      console.log(this.sectorElements);
      this.selectSector(sector.name);
      this.clickSector(sector);
    }
  }

  @Output() public selectedOrganizationType: EventEmitter<string> = new EventEmitter<string>();
  @Output() public selectedOrganization: EventEmitter<Map<string, Organization | null>> = new EventEmitter<Map<string, Organization | null>>();
  @Output() public enableComplexUrbanZoneSelector: EventEmitter<boolean> = new EventEmitter<boolean>();

  private selectedOrganizationValue: Map<string, Organization | null> = new Map<string, Organization | null>([
    [Sector.name, null],
    [Neighborhood.name, null],
    [Complex.name, null],
    [UrbanZone.name, null],
  ]);

  constructor(private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.changeSelectedOrganizationType(Sector.name);
    this.sectorList = this.organizationService.fetchSectors();
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
    this.updateSelectedOrganization(sector);

    this.enableComplexUrbanZoneSelector.emit(false);
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
    this.updateSelectedOrganization(neighborhood);

    this.enableComplexUrbanZoneSelector.emit(true);
  }

  clickUrbanZone(urbanZone: UrbanZone) {
    this.selectedUrbanZone = urbanZone;
    this.urbanZoneDisabled = false;
    this.selectedIndex.setValue(3);
    this.urbanZoneTabName = DEFAULT_URBAN_ZONE_NAME;
    this.complexAndUrbanZoneTabName = urbanZone.id + ':' + urbanZone.type + ' ';
    this.changeSelectedOrganizationType(UrbanZone.name);
    this.updateSelectedOrganization(urbanZone);
  }

  changeSelectedOrganizationType(type: string) {
    this.selectedOrganizationType.emit(type);
  }

  updateSelectedOrganization(organization: Organization) {
    this.selectedOrganizationValue.set(organization.constructor.name, organization);
    this.selectedOrganization.emit(this.selectedOrganizationValue);
  }

  changeTab($event: number) {
    this.selectedIndex.setValue($event);
    this.changeSelectedOrganizationType(TAB_NAME_LIST[$event.valueOf()]);

    this.enableComplexUrbanZoneSelector.emit(this.selectedIndex.getRawValue() === 2);
  }

  selectSector(content: string) {
    if (!this.sectorElements) return;
    const result: MatListOption | undefined = this.sectorElements.find(sectorElem => {
      if (sectorElem && sectorElem._elementRef && sectorElem._elementRef.nativeElement && sectorElem._elementRef.nativeElement.textContent) {
        return sectorElem._elementRef.nativeElement.textContent.includes(content)
      }
      return false;
    });
    if(result){
      result.selected = true
    }
  }
}
