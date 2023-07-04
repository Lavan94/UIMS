import {Urban_Zone} from "./Urban_Zone";
import {Organization} from "./Organization";
import {Neighborhood} from "./Neighborhood";
import * as geoJson from "geojson";

export class Complex implements Organization{
    constructor(
        public id: string = '',
        public name: string = '',
        public parentId: string = '',
        public children: Urban_Zone[] = [],
        public parent?: Neighborhood,
        public geoJson?: geoJson.Feature
    ) {
    }
}
