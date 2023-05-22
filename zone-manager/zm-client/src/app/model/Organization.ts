import {UtilityCost} from "./UtilityCost";
import {Owner} from "./Owner";

export class Sector {
  constructor(
    public id: string = '',
    public name: string = '',
    public neighborhoods: Neighborhood [] = []
  ) {}
}

export class Neighborhood {
  constructor(
    public id: string = '',
    public name: string = '',
    public parentId: string = '',
    public children: (Complex | UrbanZone)[] = []
  ) {}
}

export class Complex {
  constructor(
    public id: string = '',
    public name: string = '',
    public parentId: string = '',
    public children: UrbanZone[] = []
  ) {}
}

export class UrbanZone {
  constructor(
    public id: string = '',
    public owner: Owner | null = null,
    public type: string = '',
    public parentId: string = '',
    public utilityCosts: UtilityCost[] = []
  ) {}
}
