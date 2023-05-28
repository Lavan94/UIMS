import {UrbanZone} from "./UrbanZone";
import {Organization} from "./Organization";

export class Complex implements Organization{
    constructor(
        public id: string = '',
        public name: string = '',
        public parentId: string = '',
        public children: UrbanZone[] = []
    ) {
    }
}
