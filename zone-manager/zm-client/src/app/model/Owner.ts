import {UrbanZone} from "./Organization/UrbanZone";

export enum OwnerRole{
  ADMINISTRATOR,
  SERVICE_PROVIDER,
  BUSINESS_OWNER,
  PRIVATE_OWNER,
}

export class Owner {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public role: OwnerRole,
    public zones: UrbanZone[]
  ) {}
}
