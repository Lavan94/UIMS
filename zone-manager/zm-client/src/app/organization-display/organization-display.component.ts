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
import {MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";

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

  private lastEvent?: MapOrganizationEvent;

  @ViewChildren('sectorElem') sectorElements?: QueryList<MatListOption>;
  @ViewChildren('neighborhoodElem') neighborhoodElements?: QueryList<MatListOption>;
  @ViewChildren('complexElem') complexElements?: QueryList<MatExpansionPanelHeader>;
  @ViewChildren('uzElem') uzElements?: QueryList<MatListOption>;

  @Input() set mapSelectedSector(event: MapOrganizationEvent | null) {
    if(!event) return;
    if(event.selectedOrganization instanceof  Sector){
      const sector = event.selectedOrganization as Sector;
      if (sector) {
        console.log(this.sectorElements);
        this.selectSector(sector.name);
        this.clickSector(sector, false);
        this.lastEvent = event;
      }
      return;
    }

    if(event.selectedOrganization instanceof Neighborhood){
      const neighborhood = event.selectedOrganization as Neighborhood;
      if (neighborhood) {
        console.log(this.sectorElements);
        this.selectNeighborhood(neighborhood.name);
        this.clickNeighborhood(neighborhood, false);
        this.lastEvent = event;
      }
      return;
    }

    if(event.selectedOrganization instanceof Complex){
      const complex = event.selectedOrganization as Complex;
      if (complex) {
        console.log(this.sectorElements);
        this.selectComplex(complex.name);
        // this.clickUrbanZone(complex, false);
        this.lastEvent = event;
      }
      return;
    }

    if(event.selectedOrganization instanceof UrbanZone){
      const urbanZone = event.selectedOrganization as UrbanZone;
      if (urbanZone) {
        console.log(this.sectorElements);
        this.selectUrbanZone(urbanZone.id + ' : ' + urbanZone.type);
        this.clickUrbanZone(urbanZone, false);
        this.lastEvent = event;
      }
      return;
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

  clickNeighborhood(neighborhood: Neighborhood, emitToMapDisplay: boolean = true) {
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
    if(emitToMapDisplay) {
      this.updateSelectedOrganization(new SelectOrganizationDisplayEvent(neighborhood));
    }
    this.enableComplexUrbanZoneSelector.emit(true);
  }

  clickUrbanZone(urbanZone: UrbanZone, emitToMapDisplay: boolean = true) {
    this.selectedUrbanZone = urbanZone;
    this.selectedUrbanZone = urbanZone;
    this.urbanZoneDisabled = false;
    this.selectedIndex.setValue(3);
    this.urbanZoneTabName = DEFAULT_URBAN_ZONE_NAME;
    this.complexAndUrbanZoneTabName = urbanZone.id + ':' + urbanZone.type;
    if(emitToMapDisplay) {
      this.updateSelectedOrganization(new SelectOrganizationDisplayEvent(urbanZone));
    }
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
        this.updateSelectedOrganization(new ChangeOrganizationTabEvent(this.selectedSector, undefined, Sector.name));
        break;
      }
      case Neighborhood.name: {
        this.updateSelectedOrganization(new ChangeOrganizationTabEvent(this.selectedNeighborhood, this.selectedSector, Neighborhood.name));
        break;
      }
      case Complex.name: {
        this.updateSelectedOrganization(new ChangeOrganizationTabEvent(this.selectedComplex, this.selectedNeighborhood, Complex.name));
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

  private selectNeighborhood(content: string) {
    if (!this.neighborhoodElements) return;
    const result: MatListOption | undefined = this.neighborhoodElements.find(sectorElem => {
      if (sectorElem && sectorElem._elementRef && sectorElem._elementRef.nativeElement && sectorElem._elementRef.nativeElement.textContent) {
        return sectorElem._elementRef.nativeElement.textContent.includes(content)
      }
      return false;
    });
    if (result) {
      result.selected = true
    }
  }

  private selectComplex(content: string) {
    if (!this.complexElements) return;
    const result: MatExpansionPanelHeader | undefined = this.complexElements.find(complexElem => {
      if(complexElem.panel && complexElem.panel._headerId){
        const header = document.getElementById(complexElem.panel._headerId)
        return header && header.textContent ? header.textContent.includes(content) : false;
      }
      return false;
    });
    if (result) {
      result._toggle();
    }
  }

  private selectUrbanZone(content: string) {
    if (!this.uzElements) return;
    const result: MatListOption | undefined = this.uzElements.find(uzElem => {
      if (uzElem && uzElem._elementRef && uzElem._elementRef.nativeElement && uzElem._elementRef.nativeElement.textContent) {
        return uzElem._elementRef.nativeElement.textContent.includes(content)
      }
      return false;
    });
    if (result) {
      result.selected = true
    }
  }
}
