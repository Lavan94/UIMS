import {OrganizationDto} from "../model/DTO/OrganizationDto";
import {Sector} from "../model/Organization/Sector";
import {Neighborhood} from "../model/Organization/Neighborhood";
import {Complex} from "../model/Organization/Complex";
import {Urban_Zone, UrbanZoneType} from "../model/Organization/Urban_Zone";

export class OrganizationMapper{
  public static convertDto2Sector(organizationDto: OrganizationDto): Sector{
    let sector: Sector = new Sector()
    sector.id = organizationDto.id;
    sector.name = organizationDto.name;
    sector.geoJson = JSON.parse(organizationDto.geoJson);
    if(sector.geoJson){
      sector.geoJson.id = organizationDto.id
    }
    sector.neighborhoods = organizationDto.zoneList
      .map(neighborhoodDto => OrganizationMapper.convertDto2Neighborhood(neighborhoodDto))

    return sector;
  }

  public static convertDto2Neighborhood(organizationDto: OrganizationDto): Neighborhood{
    let neighborhood: Neighborhood = new Neighborhood()
    neighborhood.id = organizationDto.id;
    neighborhood.name = organizationDto.name;
    neighborhood.geoJson = JSON.parse(organizationDto.geoJson);
    neighborhood.parentId = organizationDto.parentId
    if(neighborhood.geoJson){
      neighborhood.geoJson.id = organizationDto.id
    }

    const complexChildren = organizationDto.zoneList
      .filter(org => org.organizationZoneType === Complex.name.toUpperCase())
      .map(complexDto => OrganizationMapper.convertDto2Complex(complexDto));

    const urbanZoneChildren = organizationDto.zoneList
      .filter(org => org.organizationZoneType === Urban_Zone.name.toUpperCase())
      .map(uzDto => OrganizationMapper.convertDto2UrbanZone(uzDto))

    neighborhood.children = neighborhood.children.concat(complexChildren).concat(urbanZoneChildren)

    return neighborhood;
  }

  public static convertDto2Complex(organizationDto: OrganizationDto): Complex{
    let complex: Complex = new Complex()
    complex.id = organizationDto.id;
    complex.name = organizationDto.name;
    complex.geoJson = JSON.parse(organizationDto.geoJson);
    complex.parentId = organizationDto.parentId
    complex.children = organizationDto.zoneList.map(zone => OrganizationMapper.convertDto2UrbanZone(zone))
    if(complex.geoJson){
      complex.geoJson.id = organizationDto.id
    }
    return complex;
  }

  public static convertDto2UrbanZone(organizationDto: OrganizationDto): Urban_Zone{
    let urbanZone: Urban_Zone = new Urban_Zone()
    urbanZone.id = organizationDto.id;
    urbanZone.name = organizationDto.name
    urbanZone.geoJson = JSON.parse(organizationDto.geoJson);
    urbanZone.parentId = organizationDto.parentId
    // @ts-ignore
    urbanZone.type = Object.values(UrbanZoneType).includes(organizationDto.uzType) ? UrbanZoneType[organizationDto.uzType] : UrbanZoneType.NONE
    if(urbanZone.geoJson){
      urbanZone.geoJson.id = organizationDto.id
    }
    return urbanZone;
  }
}
