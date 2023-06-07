import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as L from 'leaflet';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import 'leaflet-draw';
import {Layer, LeafletMouseEvent} from "leaflet";
import {MapAction} from "./action/MapAction";
import {MatDialog} from "@angular/material/dialog";
import {DEFAULT_ZONE_STYLE, NAVIGATE_INTO_ZONE_STYLE, SELECTED_ZONE_STYLE} from "./zone-styles/ZoneStyles";
import {
  AddEditOrganizationDialogComponent
} from "../organization-dialog/add-organization-dialog/add-edit-organization-dialog.component";
import {OrganizationService} from "../organization-service/organization.service";
import {UrbanZone} from "../model/Organization/UrbanZone";
import {Complex} from "../model/Organization/Complex";
import {Neighborhood} from "../model/Organization/Neighborhood";
import {Sector} from "../model/Organization/Sector";
import {
  Organization,
  ORGANIZATION_HIERARCHY,
  URBAN_ZONE_UNDER_NEIGHBORHOOD_KEY
} from "../model/Organization/Organization";

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
    new MapAction('move-icon', () => {
    }),
    new MapAction('select-icon', () => {
    })
  ];
  public selectedZone?: any;
  public selectedToggleValue: string = 'Complex';

  private selectedSector?: Sector;
  private selectedNeighborhood?: Neighborhood;
  private selectedComplex?: Complex;
  private selectedUrbanZone?: UrbanZone;

  @Input() selectedToggleDisplay: boolean = false;
  @Input() selectedOrganizationType: string = Sector.toString();
  @Input() selectedOrganization: Map<string, Organization | null> = new Map<string, Organization | null>([
    [Sector.name, null],
    [Neighborhood.name, null],
    [Complex.name, null],
    [UrbanZone.name, null],
  ]);

  @Input() set setSelectedOrganization(organization: Organization | undefined){
    if(!organization) return;
    switch (organization.constructor.name){
      case Sector.name:{
        this.selectedSector = organization as Sector;
        this.navigateIntoSector(L.geoJson(this.selectedSector.geoJson), this.selectedSector)
        break;
      }
      case Neighborhood.name:{
        break;
      }
      case Complex.name:{
        break;
      }
      case UrbanZone.name:{
        break;
      }
      default:
        return;
    }
  }

  @Output() navigatedSectorEmitter: EventEmitter<Sector> = new EventEmitter<Sector>();
  @Output() navigatedNeighborhoodEmitter: EventEmitter<Neighborhood> = new EventEmitter<Neighborhood>();
  @Output() navigatedComplexEmitter: EventEmitter<Complex> = new EventEmitter<Complex>();
  @Output() navigatedUrbanZoneEmitter: EventEmitter<UrbanZone> = new EventEmitter<UrbanZone>();

  public editEnabled: boolean = false;
  public editChoice?: string;

  public drawEnabled: boolean = false;

  private zoom: number | undefined;
  private centroid!: L.LatLngExpression;
  private map!: L.DrawMap;
  private drawHandler: any
  private drawnItems: L.FeatureGroup = new L.FeatureGroup();
  private drawControl = new L.Control.Draw({
    edit: {
      featureGroup: this.drawnItems
    }
  });

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private organizationService: OrganizationService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.initDrawnItems()
    this.initMap();
  }

  private initDrawnItems() {
    const sectors = this.organizationService.fetchSectors();
    sectors.forEach(sector => {
      let sectorLayer = L.geoJson(sector.geoJson);
      sectorLayer.on('click', this.selectZone);
      sectorLayer.on('dblclick', this.navigateIntoZone)
      sectorLayer.setStyle(DEFAULT_ZONE_STYLE)
      this.drawnItems.addLayer(sectorLayer);
    })
  }

  private initMap(): void {
    self = this;
    this.zoom = 12;
    this.centroid = [44.328543874089306, 23.817992421036475];
    this.map = L.map('map').setView(this.centroid, this.zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">',
    }).addTo(this.map);
    this.map.addLayer(this.drawnItems);

    this.map.on(L.Draw.Event.CREATED, e => {
      const layer = e.layer;
      e.layer.setStyle(DEFAULT_ZONE_STYLE)
      layer.on('click', this.selectZone);
      this.drawnItems.addLayer(layer);
      this.drawEnabled = false;

      const organizationParentType = this.getParentOrganizationType();
      const organizationParent = this.selectedOrganization.has(organizationParentType) ?
        this.selectedOrganization.get(organizationParentType) : null;

      const dialogRef = this.dialog.open(AddEditOrganizationDialogComponent, {
        data: {
          organizationType: !this.selectedToggleDisplay ? this.selectedOrganizationType : this.selectedToggleValue,
          organizationParent: organizationParent,
          complexOrUrbanZone: this.selectedToggleDisplay ? this.selectedToggleValue : undefined
        }
      });

      dialogRef.afterClosed().subscribe((organizationResult: Organization) => {
        console.log(organizationResult);
        this.organizationService.addOrganization(organizationResult);
      })
    });
  }

  private getParentOrganizationType(): string {
    if(this.selectedOrganizationType.constructor.name !== UrbanZone.name){
      // @ts-ignore
      return ORGANIZATION_HIERARCHY.has(this.selectedOrganizationType) ?
        ORGANIZATION_HIERARCHY.get(this.selectedOrganizationType) : '';
    }
    // @ts-ignore
    return ORGANIZATION_HIERARCHY.get(URBAN_ZONE_UNDER_NEIGHBORHOOD_KEY);
  }

  selectZone(e: LeafletMouseEvent) {
    self.deselectAll();
    let affectedZone = e.target;
    if(!e.target.editing){
      affectedZone = e.layer;
    }
    affectedZone.setStyle(SELECTED_ZONE_STYLE);

    if (self.selectedZone && self.selectedZone.editing._enabled) {
      self.selectedZone.editing.disable()
      affectedZone.editing.enable();
    }
    self.selectedZone = affectedZone;
  }

  navigateIntoZone(e: LeafletMouseEvent){
    const currentSector: Sector | undefined = self.organizationService.fetchSectors()
      .find(sector => sector.geoJson && sector.geoJson.id && sector.geoJson.id === e.layer.feature.id);
    if(currentSector){
      self.navigateIntoSector(e.layer, currentSector);
    }
  }

  navigateIntoSector(layer: any, sector: Sector){
    console.log(layer);
    layer.setStyle(NAVIGATE_INTO_ZONE_STYLE)
    this.drawnItems.clearLayers();
    layer.on('click', undefined);
    this.drawnItems.addLayer(layer);
    sector.neighborhoods.forEach(neighborhood => {
      let neighborhoodLayer = L.geoJson(neighborhood.geoJson);
      neighborhoodLayer.setStyle(DEFAULT_ZONE_STYLE);
      neighborhoodLayer.on('click', this.selectZone);
      neighborhoodLayer.setZIndex(2);
      this.drawnItems.addLayer(neighborhoodLayer);
    });
    this.navigatedSectorEmitter.emit(sector);
  }

  deselectAll() {
    this.drawnItems.setStyle(DEFAULT_ZONE_STYLE)
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
  }
}
