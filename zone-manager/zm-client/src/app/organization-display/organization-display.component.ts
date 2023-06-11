import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {FormControl} from "@angular/forms";
import {OrganizationService} from "../organization-service/organization.service";
import {UrbanZone} from "../model/Organization/UrbanZone";
import {Complex} from "../model/Organization/Complex";
import {Neighborhood} from "../model/Organization/Neighborhood";
import {Sector} from "../model/Organization/Sector";
import {MatListOption} from "@angular/material/list";
import {
  ChangeOrganizationTabEvent,
  MapOrganizationEvent, SelectMapOrganizationEvent,
  SelectOrganizationDisplayEvent
} from "../organization-manager/event/MapOrganizationEvent";

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
  private selectedSector?: Sector;

  neighborhoodDisabled: boolean = true;
  neighborhoodTabName: string = DEFAULT_NEIGHBORHOOD_NAME;
  selectedSectorNeighborhoods: Neighborhood[] = [];
  private selectedNeighborhood: Neighborhood = new Neighborhood();

  complexDisabled: boolean = true;
  complexAndUrbanZoneTabName = DEFAULT_COMPLEX_AND_URBAN_ZONE_NAME;
  selectedNeighborhoodComplexes: Complex[] = [];
  selectedNeighborhoodUrbanZones: UrbanZone[] = [];
  private selectedComplex?: Complex;

  urbanZoneDisabled: boolean = true;
  urbanZoneTabName = DEFAULT_URBAN_ZONE_NAME;
  selectedUrbanZone: UrbanZone = new UrbanZone();

  private _mapSelectedSector: Sector | null = null;
  private lastEvent?: MapOrganizationEvent;

  @ViewChildren('sectorElem') sectorElements?: QueryList<MatListOption>;

  @Input() set mapSelectedSector(event: MapOrganizationEvent | null) {
    if(!event) return;
    const sector = event.selectedOrganization as Sector;
    this._mapSelectedSector = sector;
    if (sector) {
      console.log(this.sectorElements);
      this.selectSector(sector.name);
      this.clickSector(sector, false);
      this.lastEvent = event;
    }
  }

  @Output() public enableComplexUrbanZoneSelector: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() public selectedOrganizationEmitter: EventEmitter<MapOrganizationEvent> = new EventEmitter<MapOrganizationEvent>();

  constructor(private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.sectorList = this.organizationService.fetchSectors();
  }

  clickSector(sector: Sector, emitToMapDisplay: boolean = true) {
    this.selectedSector = sector;
    this.selectedSectorNeighborhoods = sector.neighborhoods
    this.neighborhoodTabName = DEFAULT_NEIGHBORHOOD_NAME;
    this.selectedIndex.setValue(1);
    this.neighborhoodDisabled = false;

    this.complexDisabled = true;
    this.complexAndUrbanZoneTabName = DEFAULT_COMPLEX_AND_URBAN_ZONE_NAME;

    this.urbanZoneDisabled = true;
    this.urbanZoneTabName = DEFAULT_URBAN_ZONE_NAME;

    this.sectorTabName = sector.name;
    if(emitToMapDisplay) {
      this.updateSelectedOrganization(new SelectOrganizationDisplayEvent(sector));
    }
      this.enableComplexUrbanZoneSelector.emit(false);
  }

  clickNeighborhood(neighborhood: Neighborhood) {
    this.selectedNeighborhood = neighborhood;
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
    this.updateSelectedOrganization(new SelectOrganizationDisplayEvent(neighborhood));

    this.enableComplexUrbanZoneSelector.emit(true);
  }

  clickUrbanZone(urbanZone: UrbanZone) {
    this.selectedUrbanZone = urbanZone;
    this.selectedUrbanZone = urbanZone;
    this.urbanZoneDisabled = false;
    this.selectedIndex.setValue(3);
    this.urbanZoneTabName = DEFAULT_URBAN_ZONE_NAME;
    this.complexAndUrbanZoneTabName = urbanZone.id + ':' + urbanZone.type + ' ';
    this.updateSelectedOrganization(new SelectOrganizationDisplayEvent(urbanZone));
  }

  updateSelectedOrganization(event: MapOrganizationEvent) {
    this.selectedOrganizationEmitter.emit(event);
  }

  changeTab($event: number) {
    this.selectedIndex.setValue($event);
    if(this.lastEvent instanceof SelectMapOrganizationEvent){
      this.lastEvent = undefined;
      return;
    }
    const organizationType = TAB_NAME_LIST[$event.valueOf()];
    switch (organizationType) {
      case Sector.name: {
        this.updateSelectedOrganization(new ChangeOrganizationTabEvent(this.selectedSector));
        break;
      }
      case Neighborhood.name: {
        this.updateSelectedOrganization(new ChangeOrganizationTabEvent(this.selectedNeighborhood, this.selectedSector));
        break;
      }
      case Complex.name: {
        this.updateSelectedOrganization(new ChangeOrganizationTabEvent(this.selectedComplex));
        break;
      }
      case UrbanZone.name: {
        this.updateSelectedOrganization(new ChangeOrganizationTabEvent(this.selectedUrbanZone));
        break;
      }
    }

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
    if (result) {
      result.selected = true
    }
  }
}
