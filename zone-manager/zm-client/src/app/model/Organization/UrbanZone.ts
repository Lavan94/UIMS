import {Owner} from "../Owner";
import {UtilityCost} from "../UtilityCost";
import {Organization} from "./Organization";
import {Neighborhood} from "./Neighborhood";
import {Complex} from "./Complex";
import * as geoJson from "geojson";

export enum UrbanZoneType {
  NONE,
  RESIDENTIAL,
  COMMERCIAL,
  INDUSTRIAL,
  EDUCATIONAL,
  CULTURAL,
  ADMINISTRATIVE,
  BUSINESS,
  PARK,
}

export class UrbanZone implements Organization{
    constructor(
        public id: string = '',
        public owner: string | null = null,
        public type: UrbanZoneType = UrbanZoneType.NONE,
        public parentId: string = '',
        public utilityCosts: UtilityCost[] = [],
        public parent? : (Neighborhood | Complex),
        public geoJson?: geoJson.Feature
    ) {
    }

}
