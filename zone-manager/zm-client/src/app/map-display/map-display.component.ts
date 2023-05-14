import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import 'leaflet-draw';
import {Layer} from "leaflet";
import {RANDOM_AREA} from "./GeoJsonDummyData";
import {MapAction} from "./action/MapAction";

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent {
  public zoneButtons = [
    new MapAction('zone-add', this.drawPolygon),
    new MapAction('zone-edit', ()=>{})
  ];
  public toolButtons = [new MapAction('move-icon', ()=>{}), new MapAction('select-icon', ()=>{})];

  private zoom: number | undefined;
  private centroid!: L.LatLngExpression;
  private map!: L.DrawMap;
  private drawHandler: any
  private drawnItems = new L.FeatureGroup();
  private drawControl = new L.Control.Draw({
    edit: {
      featureGroup: this.drawnItems
    }
  });

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
  }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.zoom = 12;
    this.centroid = [44.328543874089306, 23.817992421036475];
    this.map = L.map('map').setView(this.centroid, this.zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">',
    }).addTo(this.map);
    this.map.doubleClickZoom.disable()
    this.map.addLayer(this.drawnItems);

    var myLayer: Layer = L.geoJSON(RANDOM_AREA)
    this.drawnItems.addLayer(myLayer);

    this.map.on(L.Draw.Event.CREATED, e => {
      const layer = e.layer;
      this.drawnItems.addLayer(layer);
    });
  }


  drawPolyLine() {
    this.drawHandler = new L.Draw.Polyline(this.map);
    this.drawHandler.enable();
  }

  drawPolygon() {
    this.drawHandler = new L.Draw.Polygon(this.map);
    this.drawHandler.enable();
  }

  disableDraw() {
    this.drawHandler.disable()
  }

}
