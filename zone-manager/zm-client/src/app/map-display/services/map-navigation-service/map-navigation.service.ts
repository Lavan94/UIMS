import {Injectable} from '@angular/core';
import {Sector} from "../../../model/Organization/Sector";
import {DEFAULT_ZONE_STYLE, NAVIGATE_INTO_ZONE_STYLE, SELECTED_ZONE_STYLE} from "../../zone-styles/ZoneStyles";
import * as L from "leaflet";
import {MapDisplayComponent} from "../../map-display.component";
import {Neighborhood} from "../../../model/Organization/Neighborhood";
import {Complex} from "../../../model/Organization/Complex";
import {ZoneStyleFactoryService} from "../zone-style-factory/zone-style-factory.service";

@Injectable({
  providedIn: 'root'
})
export class MapNavigationService {

  constructor(zoneStyleFactoryService: ZoneStyleFactoryService) {}

  navigateIntoSector(mapDisplay: MapDisplayComponent, layer: any, sector: Sector, selectedNeighborhoodId?: string) {
    console.log(layer);
    layer.setStyle(NAVIGATE_INTO_ZONE_STYLE)
    mapDisplay.drawnItems.clearLayers();
    layer.on('click', undefined);
    mapDisplay.drawnItems.addLayer(layer);
    sector.neighborhoods.forEach(neighborhood => {
      let neighborhoodLayer = L.geoJson(neighborhood.geoJson);
      neighborhoodLayer.on('click', mapDisplay.selectZone);
      neighborhoodLayer.on('dblclick', mapDisplay.navigateIntoZone)
      neighborhoodLayer.setZIndex(2);

      if (selectedNeighborhoodId && selectedNeighborhoodId === neighborhood.id) {
        neighborhoodLayer.setStyle(SELECTED_ZONE_STYLE);
      } else {
        neighborhoodLayer.setStyle(DEFAULT_ZONE_STYLE);
      }
      mapDisplay.drawnItems.addLayer(neighborhoodLayer);
    });
  }

  navigateIntoNeighborhood(mapDisplay: MapDisplayComponent, layer: any, neighborhood: Neighborhood, selectedNeighborhoodId?: string) {
    console.log(layer);
    layer.setStyle(NAVIGATE_INTO_ZONE_STYLE)
    mapDisplay.drawnItems.clearLayers();
    layer.on('click', undefined);
    mapDisplay.drawnItems.addLayer(layer);
    neighborhood.children.forEach(child => {
      let childLayer = L.geoJson(child.geoJson);
      childLayer.on('click', mapDisplay.selectZone);
      childLayer.on('dblclick', mapDisplay.navigateIntoZone)
      childLayer.setZIndex(3);

      if (selectedNeighborhoodId && selectedNeighborhoodId === child.id) {
        childLayer.setStyle(SELECTED_ZONE_STYLE);
      } else {
        childLayer.setStyle(DEFAULT_ZONE_STYLE);
      }
      mapDisplay.drawnItems.addLayer(childLayer);
    });
  }

  navigateIntoComplex(mapDisplay: MapDisplayComponent, layer: any, complex: Complex, selectedComplexId?: string) {
    console.log(layer);
    layer.setStyle(NAVIGATE_INTO_ZONE_STYLE)
    mapDisplay.drawnItems.clearLayers();
    layer.on('click', undefined);
    mapDisplay.drawnItems.addLayer(layer);
    complex.children.forEach(child => {
      let childLayer = L.geoJson(child.geoJson);
      childLayer.on('click', mapDisplay.selectZone);
      childLayer.on('dblclick', mapDisplay.navigateIntoZone)
      childLayer.setZIndex(3);

      if (selectedComplexId && selectedComplexId === child.id) {
        childLayer.setStyle(SELECTED_ZONE_STYLE);
      } else {
        childLayer.setStyle(DEFAULT_ZONE_STYLE);
      }
      mapDisplay.drawnItems.addLayer(childLayer);
    });
  }
}
