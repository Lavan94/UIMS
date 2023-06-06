import {Complex} from "./Complex";
import {UrbanZone} from "./UrbanZone";
import {Organization} from "./Organization";
import {Sector} from "./Sector";
import * as geoJson from "geojson";
import {RANDOM_AREA} from "../../map-display/GeoJsonDummyData";

export class Neighborhood implements Organization{
    constructor(
        public id: string = '',
        public name: string = '',
        public parentId: string = '',
        public children: (Complex | UrbanZone)[] = [],
        public parent?: Sector,
        public geoJson: geoJson.GeoJsonObject = RANDOM_AREA
    ) {
    }
}
