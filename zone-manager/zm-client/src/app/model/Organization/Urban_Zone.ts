import {Owner} from "../Owner";
import {FinancialData} from "../FinancialData";
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
        public utilityCosts: FinancialData[] = [
          new FinancialData("1", 20, 62, 70, 10, 2500, "Ron", new Date('15 Jun 2023 00:00:00 GMT'), "Month"),
          new FinancialData("2", 21, 62, 70, 10, 2500, "Ron", new Date('15 Jun 2023 00:00:00 GMT'), "Month"),
          new FinancialData("3", 22, 62, 70, 10, 2500, "Ron", new Date('15 Jun 2023 00:00:00 GMT'), "Month"),
          new FinancialData("4", 23, 62, 70, 10, 2500, "Ron", new Date('15 Jun 2023 00:00:00 GMT'), "Month"),
        ],
        public parent? : (Neighborhood | Complex),
        public geoJson?: geoJson.Feature
    ) {
    }

}
