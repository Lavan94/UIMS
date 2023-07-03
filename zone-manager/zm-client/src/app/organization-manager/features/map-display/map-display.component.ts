import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as L from 'leaflet';
import {FeatureGroup, geoJson, LeafletMouseEvent} from 'leaflet';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import 'leaflet-draw';
import {MapAction} from "./action/MapAction";
import {MatDialog} from "@angular/material/dialog";
import {DEFAULT_ZONE_STYLE, NAVIGATE_INTO_ZONE_STYLE, SELECTED_ZONE_STYLE} from "./services/zone-style-factory/ZoneStyles";
import {
  AddEditOrganizationDialogComponent
} from "./features/organization-dialog/add-organization-dialog/add-edit-organization-dialog.component";
import {OrganizationService} from "../../services/organization-service/organization.service";
import {Urban_Zone} from "../../../model/Organization/Urban_Zone";
import {Complex} from "../../../model/Organization/Complex";
import {Neighborhood} from "../../../model/Organization/Neighborhood";
import {Sector} from "../../../model/Organization/Sector";
import {
  Organization,
  ORGANIZATION_HIERARCHY,
  URBAN_ZONE_UNDER_NEIGHBORHOOD_KEY
} from "../../../model/Organization/Organization";
import {
  ChangeOrganizationTabEvent,
  MapOrganizationEvent,
  OrganizationMapEventAction
} from "../../event/MapOrganizationEvent";
import {MapNavigationService} from "./services/map-navigation-service/map-navigation.service";
import {OrganizationMapper} from "../../../mapper/OrganizationMapper";
import {ZoneStyleFactoryService} from "./services/zone-style-factory/zone-style-factory.service";

let self: MapDisplayComponent;

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent {
  public zoneButtons = [
    new MapAction('zone-add', this.drawPolygon),
    new MapAction('zone-edit', this.editPolygon)
  ];
  public toolButtons = [
    // new MapAction('move-icon', () => {
    // }),
    // new MapAction('select-icon', () => {
    // })
  ];
  public selectedZone?: any;
  public previousSelectedStyle?: any;
  public selectedToggleValue: string = 'Complex';
  public selectedOrganizationType: string = Sector.name;

  public selectedSector?: Sector;
  public selectedNeighborhood?: Neighborhood;
  public selectedComplex?: Complex;
  public selectedUrbanZone?: Urban_Zone;

  public fetchedSectors?: Sector[];
  public fetchedNeighborhoods?: Neighborhood[];
  public fetchedComplexes?: Complex[];
  public fetchedUrbanZones?: Urban_Zone[];

  @Input() selectedToggleDisplay: boolean = false;

  @Input() set onMapOrganizationEvent(event: MapOrganizationEvent | undefined) {
    if (!event) return;
    if (event.action === OrganizationMapEventAction.CHANGE_ORG_TAB) {
      this.onChangeTabEvent(event as ChangeOrganizationTabEvent);
      return;
    }
    const organization = event.selectedOrganization;
    if (!organization) return;
    switch (organization.constructor.name) {
      case Sector.name: {
        const inputSelectedSector = organization as Sector;
        if (this.selectedSector && this.selectedSector.id === inputSelectedSector.id) {
          this.selectedOrganizationType = Sector.name
          break;
        }
        this.selectedSector = inputSelectedSector;
        this.selectedOrganizationType = Neighborhood.name
        this.mapNavigationService.navigateIntoSector(this, L.geoJson(this.selectedSector.geoJson), this.selectedSector)
        break;
      }
      case Neighborhood.name: {
        const inputSelectedNeighborhood = organization as Neighborhood;
        if (this.selectedNeighborhood && this.selectedNeighborhood.id === inputSelectedNeighborhood.id) {
          this.selectedOrganizationType = Neighborhood.name
          break;
        }
        this.selectedNeighborhood = inputSelectedNeighborhood;
        this.selectedOrganizationType = Complex.name
        this.mapNavigationService.navigateIntoNeighborhood(this, L.geoJson(this.selectedNeighborhood.geoJson), this.selectedNeighborhood)
        break;
      }
      case Complex.name: {
        const inputSelectedComplex = organization as Complex;
        if (this.selectedComplex && this.selectedComplex.id === inputSelectedComplex.id) {
          this.selectedOrganizationType = Complex.name
          break;
        }
        this.selectedComplex = inputSelectedComplex;
        this.selectedOrganizationType = Urban_Zone.name
        this.mapNavigationService.navigateIntoComplex(this, L.geoJson(this.selectedComplex.geoJson), this.selectedComplex)
        break;
      }
      case Urban_Zone.name: {
        const inputSelectedUrbanZone = organization as Urban_Zone;
        this.selectedOrganizationType = Urban_Zone.name
        this.selectedUrbanZone = inputSelectedUrbanZone;
        this.mapNavigationService.navigateIntoUrbanZone(this, L.geoJson(this.selectedUrbanZone.geoJson))
        break;
      }
      default:
        return;
    }
  }

  @Output() navigatedOrganizationEventEmitter: EventEmitter<MapOrganizationEvent> = new EventEmitter<MapOrganizationEvent>();
  @Output() navigatedNeighborhoodEmitter: EventEmitter<Neighborhood> = new EventEmitter<Neighborhood>();
  @Output() navigatedComplexEmitter: EventEmitter<Complex> = new EventEmitter<Complex>();
  @Output() navigatedUrbanZoneEmitter: EventEmitter<Urban_Zone> = new EventEmitter<Urban_Zone>();

  public editEnabled: boolean = false;
  public editChoice?: string;

  public drawEnabled: boolean = false;

  private zoom: number | undefined;
  private centroid!: L.LatLngExpression;
  private map!: L.DrawMap;
  private drawHandler: any
  private _drawnItems: L.FeatureGroup = new L.FeatureGroup();
  private drawControl = new L.Control.Draw({
    edit: {
      featureGroup: this._drawnItems
    }
  });

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private mapNavigationService: MapNavigationService,
    private organizationService: OrganizationService,
    public dialog: MatDialog,
    private zoneStyleFactoryService: ZoneStyleFactoryService
  ) {
  }

  ngOnInit(): void {
    this.initDrawnItems()
    this.initMap();
  }

  get drawnItems(): FeatureGroup {
    return this._drawnItems;
  }

  private initDrawnItems(selectId?: string) {
    this.organizationService.fetchSectors().subscribe((sectorsDto) =>{
      this.fetchedSectors = sectorsDto.map(dto => OrganizationMapper.convertDto2Sector(dto));
      this.fetchedSectors.forEach(sector => {
        let sectorLayer = L.geoJson(sector.geoJson);
        sectorLayer.on('click', this.selectZone);
        sectorLayer.on('dblclick', this.navigateIntoZone)
        if (sector.geoJson) {
          sector.geoJson.id = sector.geoJson.id ? sector.geoJson.id : sector.id
          if(sector.geoJson.id === selectId){
            sectorLayer.setStyle(SELECTED_ZONE_STYLE);
          } else {
            sectorLayer.setStyle(DEFAULT_ZONE_STYLE)
          }
        }
        this._drawnItems.addLayer(sectorLayer);
      })
    });
  }

  private initMap(): void {
    self = this;
    this.zoom = 12;
    this.centroid = [44.328543874089306, 23.817992421036475];
    this.map = L.map('map').setView(this.centroid, this.zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">',
    }).addTo(this.map);
    this.map.addLayer(this._drawnItems);

    this.map.on(L.Draw.Event.CREATED, e => {
      // if(this.selectedToggleValue != Urban_Zone.name){
      //   const layer = e.layer;
      //   e.layer.setStyle(DEFAULT_ZONE_STYLE)
      //   layer.on('click', this.selectZone);
      //   this._drawnItems.addLayer(layer);
      // }
      this.drawEnabled = false;
      let organizationParent;
      const organizationParentType = this.getParentOrganizationType();
      switch (organizationParentType) {
        case Sector.name: {
          organizationParent = this.selectedSector;
          break;
        }
        case Neighborhood.name: {
          organizationParent = this.selectedNeighborhood;
          break;
        }
        case Complex.name: {
          organizationParent = this.selectedComplex;
          break;
        }
        case Urban_Zone.name: {
          organizationParent = this.selectedUrbanZone;
          break;
        }
        default:
          organizationParent = undefined;
          break;
      }

      const dialogRef = this.dialog.open(AddEditOrganizationDialogComponent, {
        data: {
          organizationType: !this.selectedToggleDisplay ? this.selectedOrganizationType : this.selectedToggleValue,
          organizationParent: organizationParent,
          complexOrUrbanZone: this.selectedToggleDisplay ? this.selectedToggleValue : undefined
        }
      });

      dialogRef.afterClosed().subscribe((organizationResult: Organization) => {
        console.log(organizationResult);
        organizationResult.geoJson = e.layer.toGeoJSON();
        this.organizationService.addOrganization(organizationResult);
        const layer = e.layer;
        layer.setStyle(DEFAULT_ZONE_STYLE)

        const urbanType = organizationResult instanceof Urban_Zone ? (organizationResult as Urban_Zone).type : null;
        if(urbanType){
          layer.setStyle(this.zoneStyleFactoryService.getUrbanZoneStyle(urbanType));
        }

        layer.on('click', this.selectZone);
        this._drawnItems.addLayer(layer);
      })
    });
  }

  private getParentOrganizationType(): string {
    if (this.selectedOrganizationType !== Urban_Zone.name) {
      // @ts-ignore
      return ORGANIZATION_HIERARCHY.has(this.selectedOrganizationType) ?
        ORGANIZATION_HIERARCHY.get(this.selectedOrganizationType) : '';
    }
    // @ts-ignore
    return ORGANIZATION_HIERARCHY.get(URBAN_ZONE_UNDER_NEIGHBORHOOD_KEY);
  }

  selectZone(e: LeafletMouseEvent) {
    if(self.selectedZone){
      self.selectedZone.setStyle(self.previousSelectedStyle ? self.previousSelectedStyle : DEFAULT_ZONE_STYLE)
    }
    // self.deselectAll();
    let affectedZone = e.target;
    if (!e.target.editing) {
      affectedZone = e.layer;
    }
    self.previousSelectedStyle = JSON.parse(JSON.stringify(affectedZone.options));
    affectedZone.setStyle(SELECTED_ZONE_STYLE);

    if (self.selectedZone && self.selectedZone.editing._enabled) {
      self.selectedZone.editing.disable()
      affectedZone.editing.enable();
    }
    self.selectedZone = affectedZone;
  }

  navigateIntoZone(e: LeafletMouseEvent) {
    self.selectedZone = undefined;
    self.mapNavigationService.navigateIntoZone(self, e)
  }

  deselectAll() {
    this._drawnItems.setStyle(DEFAULT_ZONE_STYLE)
  }

  drawPolyLine() {
    this.drawHandler = new L.Draw.Polyline(this.map);
    this.drawHandler.enable();
  }

  drawPolygon() {
    this.drawHandler = new L.Draw.Polygon(this.map);
    this.drawHandler.enable();
    this.drawEnabled = true;
  }

  disableDraw() {
    this.drawHandler.disable();
    this.drawEnabled = false;
  }

  editPolygon() {
    this.selectedZone.editing.enable();
    this.editEnabled = true;
  }

  saveEdit() {
    self.selectedZone.editing.disable();
    self.editEnabled = false;
    if(self.selectedZone.feature.id){
      const orgId = self.selectedZone.feature.id;
      let org: Organization | undefined = undefined;
      const orgType: string = self.selectedOrganizationType.toUpperCase();
      switch (self.selectedOrganizationType){
        case Sector.name:
          let updatedSector = self.fetchedSectors?.find(sector => sector.id === orgId);
          if(updatedSector){
            updatedSector.geoJson = self.selectedZone.toGeoJSON();
            org = updatedSector;
          }
          break;
        case Neighborhood.name:
          let updatedNeighborhood = self.fetchedNeighborhoods?.find(neighborhood => neighborhood.id === orgId);
          if(updatedNeighborhood){
            updatedNeighborhood.geoJson = self.selectedZone.toGeoJSON();
            org = updatedNeighborhood;
          }
          break
        case Complex.name:
          let updatedComplex = self.fetchedComplexes?.find(complex => complex.id === orgId);
          if(updatedComplex){
            updatedComplex.geoJson = self.selectedZone.toGeoJSON();
            org = updatedComplex;
          }
          break
      }
      if(org){
        self.organizationService.updateOrganization(orgType, org.id, org.name, org.geoJson);
        return;
      }
      let updatedUrbanZone = self.fetchedUrbanZones?.find(urbanZone => urbanZone.id === orgId);
      if(updatedUrbanZone){
        updatedUrbanZone.geoJson = self.selectedZone.toGeoJSON();
        self.organizationService.updateUrbanZone(
          updatedUrbanZone.id,
          updatedUrbanZone.name,
          updatedUrbanZone.geoJson,
          updatedUrbanZone.type,
          updatedUrbanZone.ownerId
        );
      }

    }
  }

  private changeTabHandlerMap: Map<string, Function> = new Map<string, Function>([
    [Sector.name, this.changeToSectorTab],
    [Neighborhood.name, this.changeToNeighborhoodTab],
    [Complex.name, this.changeToComplexAndUrbanZonesTab],
    [Urban_Zone.name, this.changeToComplexAndUrbanZonesTab],
  ])

  onChangeTabEvent(event: ChangeOrganizationTabEvent) {
    const orgType = event.orgType ? event.orgType : '';

    if (this.changeTabHandlerMap.has(orgType)) {
      // @ts-ignore
      this.changeTabHandlerMap.get(orgType).call(this, event)
    }
  }

  private changeToSectorTab(event: MapOrganizationEvent) {
    const sector = event.selectedOrganization;
    if (!sector) return;

    this._drawnItems.clearLayers();
    const sectorId = sector.geoJson && sector.geoJson.id ? sector.geoJson.id : null;
    if (sectorId) {
      this.initDrawnItems(sectorId.toString())
    } else {
      this.initDrawnItems();
    }
  }

  private changeToNeighborhoodTab(event: MapOrganizationEvent) {
    const neighborhood = event.selectedOrganization as Neighborhood;
    const sector = event.parentOrganization as Sector;

    if (!sector) return;

    this._drawnItems.clearLayers();

    if (neighborhood.id) {
      this.mapNavigationService.navigateIntoSector(this, L.geoJson(sector.geoJson), sector, neighborhood.id);
    } else {
      this.mapNavigationService.navigateIntoSector(this, L.geoJson(sector.geoJson), sector);
    }
  }

  private changeToComplexAndUrbanZonesTab(event: MapOrganizationEvent){
    if(!event.selectedOrganization && event.parentOrganization){
      const parentNeighborhood = event.parentOrganization as Neighborhood;
      this._drawnItems.clearLayers();
      this.mapNavigationService.navigateIntoNeighborhood(this, L.geoJson(parentNeighborhood.geoJson), parentNeighborhood);
    }

    if(event.selectedOrganization){
      const orgParent = this.selectedToggleValue === Complex.name ?
        event.parentOrganization as Complex : event.parentOrganization as Neighborhood;

      if(event.selectedOrganization instanceof Complex){
        this._drawnItems.clearLayers();
        this.mapNavigationService.navigateIntoComplex(this, L.geoJson(event.selectedOrganization.geoJson), event.selectedOrganization, event.selectedOrganization.id);
        return;
      }

      if(event.selectedOrganization instanceof Urban_Zone){
        this._drawnItems.clearLayers();
        this.mapNavigationService.navigateIntoUrbanZone(this, L.geoJson(event.selectedOrganization.geoJson));
        return;
      }
    }
  }
}
