import {Component, Input, Output} from '@angular/core';
import * as L from 'leaflet';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import 'leaflet-draw';
import {LeafletMouseEvent} from "leaflet";
import {MapAction} from "./action/MapAction";
import {MatDialog} from "@angular/material/dialog";
import {DEFAULT_ZONE_STYLE, SELECTED_ZONE_STYLE} from "./zone-styles/ZoneStyles";
import {
  AddEditOrganizationDialogComponent
} from "../organization-dialog/add-organization-dialog/add-edit-organization-dialog.component";
import {OrganizationService} from "../organization-service/organization.service";
import {UrbanZone} from "../model/Organization/UrbanZone";
import {Complex} from "../model/Organization/Complex";
import {Neighborhood} from "../model/Organization/Neighborhood";
import {Sector} from "../model/Organization/Sector";
import {Organization} from "../model/Organization/Organization";

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

  @Input() selectedOrganizationType: string = Sector.toString();
  public selectedOrganization: Map<string, string> = new Map<string, string>([
    [Sector.name, ''],
    [Neighborhood.name, ''],
    [Complex.name, ''],
    [UrbanZone.name, ''],
  ]);

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
  ) {
  }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    self = this;
    this.zoom = 12;
    this.centroid = [44.328543874089306, 23.817992421036475];
    this.map = L.map('map').setView(this.centroid, this.zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">',
    }).addTo(this.map);
    this.map.doubleClickZoom.disable()
    this.map.addLayer(this.drawnItems);

    this.map.on(L.Draw.Event.CREATED, e => {
      const layer = e.layer;
      e.layer.setStyle(DEFAULT_ZONE_STYLE)
      layer.on('click', this.selectZone);
      this.drawnItems.addLayer(layer);
      this.drawEnabled = false;

      const organizationParent = this.selectedOrganization.has(this.selectedOrganizationType) ?
        this.selectedOrganization.get(this.selectedOrganizationType) : null;

      const dialogRef = this.dialog.open(AddEditOrganizationDialogComponent, {
        data: {
          organizationType: this.selectedOrganizationType,
          organizationParent: organizationParent
        }
      });

      dialogRef.afterClosed().subscribe((organizationResult: Organization) => {
        console.log(organizationResult);
        this.organizationService.addOrganization(organizationResult);
      })
    });
  }

  selectZone(e: LeafletMouseEvent) {
    self.deselectAll();
    e.target.setStyle(SELECTED_ZONE_STYLE);

    if (self.selectedZone && self.selectedZone.editing._enabled) {
      self.selectedZone.editing.disable()
      e.target.editing.enable();
    }
    self.selectedZone = e.target;
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
