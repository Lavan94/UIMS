import {Injectable} from '@angular/core';
import {UrbanZoneType} from "../../../model/Organization/UrbanZone";
import {
  ADMINISTRATION_ZONE_STYLE,
  BUSINESS_ZONE_STYLE,
  COMMERCIAL_ZONE_STYLE,
  CULTURAL_ZONE_STYLE,
  DEFAULT_ZONE_STYLE,
  EDUCATIONAL_ZONE_STYLE,
  GREEN_SPACE_ZONE_STYLE,
  INDUSTRIAL_ZONE_STYLE,
  RESIDENTIAL_ZONE_STYLE
} from "../../zone-styles/ZoneStyles";

@Injectable({
  providedIn: 'root'
})
export class ZoneStyleFactoryService {
  private urbanZoneTypeToStyleMap: Map<UrbanZoneType, L.PathOptions> = new Map<UrbanZoneType, L.PathOptions>([
    [UrbanZoneType.NONE, DEFAULT_ZONE_STYLE],
    [UrbanZoneType.RESIDENTIAL, RESIDENTIAL_ZONE_STYLE],
    [UrbanZoneType.COMMERCIAL, COMMERCIAL_ZONE_STYLE],
    [UrbanZoneType.INDUSTRIAL, INDUSTRIAL_ZONE_STYLE],
    [UrbanZoneType.BUSINESS, BUSINESS_ZONE_STYLE],
    [UrbanZoneType.EDUCATIONAL, EDUCATIONAL_ZONE_STYLE],
    [UrbanZoneType.CULTURAL, CULTURAL_ZONE_STYLE],
    [UrbanZoneType.ADMINISTRATIVE, ADMINISTRATION_ZONE_STYLE],
    [UrbanZoneType.PARK, GREEN_SPACE_ZONE_STYLE],
    [UrbanZoneType.PARK, GREEN_SPACE_ZONE_STYLE],
  ])

  constructor() { }

  public getUrbanZoneStyle(urbanZoneType: UrbanZoneType = UrbanZoneType.NONE): L.PathOptions{
    let style;
    if(this.urbanZoneTypeToStyleMap.has(urbanZoneType)) {
      style = this.urbanZoneTypeToStyleMap.get(urbanZoneType)
    }
    return style ? style : DEFAULT_ZONE_STYLE;
  }
}
