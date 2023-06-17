import {Injectable} from '@angular/core';
import {Sector} from "../../../model/Organization/Sector";
import {DEFAULT_ZONE_STYLE, NAVIGATE_INTO_ZONE_STYLE, SELECTED_ZONE_STYLE} from "../../zone-styles/ZoneStyles";
import * as L from "leaflet";
import {MapDisplayComponent} from "../../map-display.component";
import {Neighborhood} from "../../../model/Organization/Neighborhood";
import {Complex} from "../../../model/Organization/Complex";
import {ZoneStyleFactoryService} from "../zone-style-factory/zone-style-factory.service";
import {SelectMapOrganizationEvent} from "../../../organization-manager/event/MapOrganizationEvent";
import {UrbanZone} from "../../../model/Organization/UrbanZone";
import {OrganizationService} from "../../../organization-service/organization.service";
import {LeafletMouseEvent} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class MapNavigationService {
  private zoneNavigationHandlerMap: Map<string, Function> = new Map<string, Function>([
    [Sector.name, this.navigateIntoSectorHandler],
    [Neighborhood.name, this.navigateIntoNeighborhoodHandler],
    [Complex.name, this.navigateIntoComplexHandler]
  ])

  constructor(private organizationService: OrganizationService, private zoneStyleFactoryService: ZoneStyleFactoryService) {}

  public navigateIntoZone(mapDisplay: MapDisplayComponent, e: LeafletMouseEvent) {
    if (this.zoneNavigationHandlerMap.has(mapDisplay.selectedOrganizationType)) {
      this.zoneNavigationHandlerMap.get(mapDisplay.selectedOrganizationType)?.call(this, mapDisplay, e.layer);
    }
  }

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

  private navigateIntoSectorHandler(mapDisplay: MapDisplayComponent, layer: any) {
    if (!mapDisplay.fetchedSectors) mapDisplay.fetchedSectors = this.organizationService.fetchSectors();

    const currentSector = mapDisplay.fetchedSectors
      .find(sector => sector.geoJson && sector.geoJson.id && sector.geoJson.id === layer.feature.id);

    if (currentSector) {
      this.navigateIntoSector(mapDisplay, layer, currentSector);
      mapDisplay.navigatedOrganizationEventEmitter.emit(new SelectMapOrganizationEvent(currentSector));
      mapDisplay.selectedSector = currentSector;
      mapDisplay.selectedOrganizationType = Neighborhood.name;
    }
  }

  private navigateIntoNeighborhoodHandler(mapDisplay: MapDisplayComponent, layer: any) {
    if (!mapDisplay.fetchedNeighborhoods) mapDisplay.fetchedNeighborhoods = mapDisplay.selectedSector?.neighborhoods

    if (!mapDisplay.fetchedNeighborhoods) return;

    const currentNeighborhood = mapDisplay.fetchedNeighborhoods
      .find(neighborhood => neighborhood.geoJson && neighborhood.geoJson.id && neighborhood.geoJson.id === layer.feature.id);

    if (currentNeighborhood) {
      this.navigateIntoNeighborhood(mapDisplay, layer, currentNeighborhood);
      mapDisplay.navigatedOrganizationEventEmitter.emit(new SelectMapOrganizationEvent(currentNeighborhood));
      mapDisplay.selectedNeighborhood = currentNeighborhood;
      mapDisplay.selectedOrganizationType = Complex.name;
    }
  }

  private navigateIntoComplexHandler(mapDisplay: MapDisplayComponent, layer: any) {
    if (!mapDisplay.fetchedComplexes) {
      if(!mapDisplay.selectedNeighborhood || !mapDisplay.selectedNeighborhood.children) return;
      mapDisplay.fetchedComplexes = mapDisplay.selectedNeighborhood.children
        .filter(child => child instanceof Complex)
        .map(child => child as Complex)
    }
    const currentComplex = mapDisplay.fetchedComplexes
      .find(complex => complex.geoJson && complex.geoJson.id && complex.geoJson.id === layer.feature.id);

    if (currentComplex) {
      this.navigateIntoComplex(mapDisplay, layer, currentComplex);
      mapDisplay.navigatedOrganizationEventEmitter.emit(new SelectMapOrganizationEvent(currentComplex));
      mapDisplay.selectedComplex = currentComplex;
      mapDisplay.selectedOrganizationType = UrbanZone.name;
    }
  }

}
