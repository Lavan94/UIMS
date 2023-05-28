import {Owner} from "../Owner";
import {UtilityCost} from "../UtilityCost";
import {Organization} from "./Organization";

export class UrbanZone implements Organization{
    constructor(
        public id: string = '',
        public owner: Owner | null = null,
        public type: string = '',
        public parentId: string = '',
        public utilityCosts: UtilityCost[] = []
    ) {
    }

}
