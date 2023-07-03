export class OrganizationDto{
  constructor(
    public id: string,
    public name: string,
    public organizationZoneType: string,
    public geoJson: string,
    public parentId: string,
    public zoneList: OrganizationDto[],
    public uzType: string,
  ) {}
}
