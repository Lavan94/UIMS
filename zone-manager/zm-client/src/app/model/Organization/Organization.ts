import {Sector} from "./Sector";
import {Neighborhood} from "./Neighborhood";
import {Complex} from "./Complex";
import {UrbanZone} from "./UrbanZone";
import {GeoJSON} from "leaflet";
import * as geoJson from "geojson";

export interface Organization{
  id: string;
  parent?: Organization;
  geoJson?: geoJson.GeoJsonObject
}

export const URBAN_ZONE_UNDER_COMPLEX_KEY: string = UrbanZone.name + '-C';
export const URBAN_ZONE_UNDER_NEIGHBORHOOD_KEY: string = UrbanZone.name + '-N';

export const ORGANIZATION_HIERARCHY: Map<string, string> = new Map<string, string>([
  [Sector.name, ''],
  [Neighborhood.name, Sector.name],
  [Complex.name, Neighborhood.name],
  [URBAN_ZONE_UNDER_COMPLEX_KEY, Complex.name],
  [URBAN_ZONE_UNDER_NEIGHBORHOOD_KEY, Neighborhood.name]
]);
