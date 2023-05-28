import {Complex} from "./Complex";
import {UrbanZone} from "./UrbanZone";
import {Organization} from "./Organization";

export class Neighborhood implements Organization{
    constructor(
        public id: string = '',
        public name: string = '',
        public parentId: string = '',
        public children: (Complex | UrbanZone)[] = []
    ) {
    }
}
