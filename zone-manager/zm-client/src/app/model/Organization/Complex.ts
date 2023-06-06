import {UrbanZone} from "./UrbanZone";
import {Organization} from "./Organization";
import {Neighborhood} from "./Neighborhood";
import * as geoJson from "geojson";

export class Complex implements Organization{
    constructor(
        public id: string = '',
        public name: string = '',
        public parentId: string = '',
        public children: UrbanZone[] = [],
        public parent?: Neighborhood,
        public geoJson?: geoJson.GeoJsonObject
    ) {
    }
}
