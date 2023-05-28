import {Owner} from "../Owner";
import {UtilityCost} from "../UtilityCost";
import {Organization} from "./Organization";
import {Neighborhood} from "./Neighborhood";
import {Complex} from "./Complex";

export class UrbanZone implements Organization{
    constructor(
        public id: string = '',
        public owner: Owner | null = null,
        public type: string = '',
        public parentId: string = '',
        public utilityCosts: UtilityCost[] = [],
        public parent? : (Neighborhood | Complex)
    ) {
    }

}
