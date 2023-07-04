import {Owner} from "../Owner";
import {UtilityCost} from "../UtilityCost";
import {Organization} from "./Organization";
import {Neighborhood} from "./Neighborhood";
import {Complex} from "./Complex";
import * as geoJson from "geojson";

export enum UrbanZoneType {
  NONE= "NONE",
  RESIDENTIAL= "RESIDENTIAL",
  COMMERCIAL= "COMMERCIAL",
  INDUSTRIAL= "INDUSTRIAL",
  EDUCATIONAL= "EDUCATIONAL",
  CULTURAL= "CULTURAL",
  ADMINISTRATIVE= "ADMINISTRATIVE",
  BUSINESS= "BUSINESS",
  PARK= "PARK",
}

export class Urban_Zone implements Organization{
    constructor(
        public id: string = '',
        public name: string = '',
        public ownerId: string | null = null,
        public type: UrbanZoneType = UrbanZoneType.NONE,
        public parentId: string = '',
        public utilityCosts: UtilityCost[] = [],
        public parent? : (Neighborhood | Complex),
        public geoJson?: geoJson.Feature
    ) {
    }

}
