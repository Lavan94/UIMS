import {Injectable} from '@angular/core';
import {Sector} from "../../../../../model/Organization/Sector";
import {DEFAULT_ZONE_STYLE, NAVIGATE_INTO_ZONE_STYLE, SELECTED_ZONE_STYLE} from "../zone-style-factory/ZoneStyles";
import * as L from "leaflet";
import {MapDisplayComponent} from "../../map-display.component";
import {Neighborhood} from "../../../../../model/Organization/Neighborhood";
import {Complex} from "../../../../../model/Organization/Complex";
import {ZoneStyleFactoryService} from "../zone-style-factory/zone-style-factory.service";
import {SelectMapOrganizationEvent} from "../../../../event/MapOrganizationEvent";
import {Urban_Zone} from "../../../../../model/Organization/Urban_Zone";
import {OrganizationService} from "../../../../services/organization-service/organization.service";
import {LeafletMouseEvent} from "leaflet";
import {OrganizationMapper} from "../../../../../mapper/OrganizationMapper";

@Injectable({
  providedIn: 'root'
})
export class MapNavigationService {
  private zoneNavigationHandlerMap: Map<string, Function> = new Map<string, Function>([
    [Sector.name, this.navigateIntoSectorHandler],
    [Neighborhood.name, this.navigateIntoNeighborhoodHandler],
    [Complex.name, this.navigateIntoComplexHandler],
    [Urban_Zone.name, this.navigateIntoUrbanZoneHandler]
  ])

  constructor(private organizationService: OrganizationService, private zoneStyleFactoryService: ZoneStyleFactoryService) {}

  public navigateIntoZone(mapDisplay: MapDisplayComponent, e: LeafletMouseEvent) {
    if (this.zoneNavigationHandlerMap.has(mapDisplay.selectedOrganizationType)) {
      this.zoneNavigationHandlerMap.get(mapDisplay.selectedOrganizationType)?.call(this, mapDisplay, e.layer);
    }
  }

  public navigateIntoSector(mapDisplay: MapDisplayComponent, layer: any, sector: Sector, selectedNeighborhoodId?: string) {
    console.log(layer);
    layer.setStyle(NAVIGATE_INTO_ZONE_STYLE)
    mapDisplay.drawnItems.clearLayers();
    layer.on('click', undefined);
    mapDisplay.drawnItems.addLayer(layer);
    if(!sector.neighborhoods) return;
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

  public navigateIntoNeighborhood(mapDisplay: MapDisplayComponent, layer: any, neighborhood: Neighborhood, selectedNeighborhoodId?: string) {
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

      if(child instanceof Urban_Zone){
        childLayer.setStyle(this.zoneStyleFactoryService.getUrbanZoneStyle(child.type));
      }

      if (selectedNeighborhoodId && selectedNeighborhoodId === child.id) {
        childLayer.setStyle(SELECTED_ZONE_STYLE);
      }

      mapDisplay.drawnItems.addLayer(childLayer);
    });
  }

  public navigateIntoComplex(mapDisplay: MapDisplayComponent, layer: any, complex: Complex, selectedComplexId?: string) {
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
        childLayer.setStyle(this.zoneStyleFactoryService.getUrbanZoneStyle(child.type));
      }
      mapDisplay.drawnItems.addLayer(childLayer);
    });
  }

  public navigateIntoUrbanZone(mapDisplay: MapDisplayComponent, layer: any){
    console.log(layer);
    mapDisplay.drawnItems.clearLayers();
    layer.on('click', undefined);
    mapDisplay.drawnItems.addLayer(layer);
  }

  private navigateIntoSectorHandler(mapDisplay: MapDisplayComponent, layer: any) {
    if (!mapDisplay.fetchedSectors) {
      this.organizationService.fetchSectors().subscribe((sectorsDto)=>{
        mapDisplay.fetchedSectors = sectorsDto.map(dto => OrganizationMapper.convertDto2Sector(dto));
      })
      return;
    }

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
      mapDisplay.navigatedOrganizationEventEmitter.emit(new SelectMapOrganizationEvent(currentNeighborhood, mapDisplay.selectedSector));
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
      mapDisplay.navigatedOrganizationEventEmitter.emit(new SelectMapOrganizationEvent(currentComplex, mapDisplay.selectedNeighborhood));
      mapDisplay.selectedComplex = currentComplex;
      mapDisplay.selectedOrganizationType = Urban_Zone.name;
    }
  }

  private navigateIntoUrbanZoneHandler(mapDisplay: MapDisplayComponent, layer: any) {
    if (!mapDisplay.fetchedComplexes) {
      if(!mapDisplay.selectedNeighborhood || !mapDisplay.selectedNeighborhood.children) return;
      mapDisplay.fetchedComplexes = mapDisplay.selectedNeighborhood.children
        .filter(child => child instanceof Complex)
        .map(child => child as Complex)
    }

    if(!mapDisplay.fetchedUrbanZones) {
      mapDisplay.fetchedUrbanZones = [];
      mapDisplay.fetchedComplexes.forEach(complex => mapDisplay.fetchedUrbanZones?.push(...complex.children))

      if(!mapDisplay.selectedNeighborhood || !mapDisplay.selectedNeighborhood.children) return;
      mapDisplay.fetchedUrbanZones?.push(
        ...(mapDisplay.selectedNeighborhood.children.filter(child => child instanceof Urban_Zone).map(child => child as Urban_Zone))
      )
    }

    const currentUrbanZone = mapDisplay.fetchedUrbanZones
      .find(urbanZone => urbanZone.geoJson && urbanZone.geoJson.id && urbanZone.geoJson.id === layer.feature.id);

    if (currentUrbanZone) {
      this.navigateIntoUrbanZone(mapDisplay, layer);
      mapDisplay.navigatedOrganizationEventEmitter.emit(new SelectMapOrganizationEvent(currentUrbanZone, currentUrbanZone.parent));
      mapDisplay.selectedUrbanZone = currentUrbanZone;
      mapDisplay.selectedOrganizationType = Urban_Zone.name;
    }
  }

}
