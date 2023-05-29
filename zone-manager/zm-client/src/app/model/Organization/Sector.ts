import {Neighborhood} from "./Neighborhood";
import {Organization} from "./Organization";

export class Sector implements Organization{
    constructor(
        public id: string = '',
        public name: string = '',
        public neighborhoods: Neighborhood [] = []
    ) {
    }
}