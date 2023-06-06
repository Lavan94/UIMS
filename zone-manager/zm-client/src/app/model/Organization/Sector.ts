import {Neighborhood} from "./Neighborhood";
import {Organization} from "./Organization";
import * as geoJson from "geojson";

export class Sector implements Organization{
    constructor(
        public id: string = '',
        public name: string = '',
        public neighborhoods: Neighborhood [] = [],
        public geoJson?: geoJson.GeoJsonObject
    ) {
    }
}
