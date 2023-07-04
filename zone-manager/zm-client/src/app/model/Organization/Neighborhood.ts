import {Complex} from "./Complex";
import {Urban_Zone} from "./Urban_Zone";
import {Organization} from "./Organization";
import {Sector} from "./Sector";
import * as geoJson from "geojson";

export class Neighborhood implements Organization{
    constructor(
        public id: string = '',
        public name: string = '',
        public parentId: string = '',
        public children: (Complex | Urban_Zone)[] = [],
        public parent?: Sector,
        public geoJson?: geoJson.Feature
    ) {
    }
}
