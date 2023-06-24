import {UrbanZone} from "./Organization/UrbanZone";

export enum OwnerRole{
  ADMINISTRATOR="ADMINISTRATOR",
  SERVICE_PROVIDER="SERVICE_PROVIDER",
  BUSINESS_OWNER="BUSINESS_OWNER",
  OWNER="OWNER",
}

export class Owner {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public phone: string,
    public role: OwnerRole,
    public zones: UrbanZone[]
  ) {}
}
