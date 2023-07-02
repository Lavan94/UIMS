import {Injectable} from '@angular/core';
import {SECTORS} from "../../../data/DummyData";
import {UrbanZone} from "../../../model/Organization/UrbanZone";
import {Complex} from "../../../model/Organization/Complex";
import {Neighborhood} from "../../../model/Organization/Neighborhood";
import {Sector} from "../../../model/Organization/Sector";
import {Organization} from "../../../model/Organization/Organization";
import {SERVER_URL} from "../../../owner-manager/service/owner.service";
import {HttpClient} from "@angular/common/http";

export const ORGANIZATION_ZONE_URL = "/organization-zone"
export const ORGANIZATION_ZONE_SERVICE_URL = SERVER_URL + ORGANIZATION_ZONE_URL

export const GET_ORGANIZATION_ZONE_URL = "/getAllByType/"
export const ADD_ORGANIZATION_ZONE_URL = "/add"
export const ADD_URBAN_ZONE_URL = "/add-urban-zone";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private orgMap: Map<string, Function> = new Map<string, Function>(
    [
      [Sector.name, this.addSector],
      [Neighborhood.name, this.addNeighborhood],
      [Complex.name, this.addComplex],
      [UrbanZone.name, this.addUrbanZone],
    ]
  )
  private sectorList: Sector[] = SECTORS;
  constructor(private httpClient: HttpClient) {
  }

  fetchSectors(){
    return this.httpClient.get<Sector[]>(ORGANIZATION_ZONE_SERVICE_URL + GET_ORGANIZATION_ZONE_URL + Sector.name.toUpperCase())

    // return this.sectorList;
  }

  fetchNeighborhoods(sectorId: string): Neighborhood[] {
     const sector = this.sectorList.find(sector => sector.id === sectorId);
     return sector ? sector.neighborhoods : [];
  }

  fetchComplexesAndUrbanZones(sectorId: string, neighborhoodId: string): (Complex|UrbanZone)[] {
    const neighborhoods = this.fetchNeighborhoods(sectorId);
    if (!neighborhoods.length) return [];

    const neighborhood = neighborhoods.find(neighborhood => neighborhood.id === neighborhoodId)
    return neighborhood ? neighborhood.children : [];
  }

  fetchUrbanZone(urbanZoneId: string, sectorId: string, neighborhoodId: string, complexId?: string): UrbanZone | null {
    const complexesAndUrbanZones = this.fetchComplexesAndUrbanZones(sectorId, neighborhoodId);
    if(!complexesAndUrbanZones.length) return null;

    let urbanZone: UrbanZone | null;

    if(complexId){
      // @ts-ignore
      const complex: Complex = complexesAndUrbanZones.find(entry => typeof entry === Complex.name && entry.id === complexId);
      if(!complex) return null;
      const result = complex.children.find(child => child.id === urbanZoneId);
      urbanZone = result ? result : null;
    } else {
      // @ts-ignore
      const result: UrbanZone = complexesAndUrbanZones.find(entry => typeof entry === UrbanZone.name && entry.id === complexId);
      urbanZone = result ? result : null;
    }
    return urbanZone;
  }

  addOrganization(organizationResult: Organization) {
    const orgType: string = organizationResult.constructor.name;
    if(organizationResult && this.orgMap.has(orgType)) {
      // @ts-ignore
      this.orgMap.get(orgType).call(this, organizationResult);
      return;
    }
    console.log("Organization type not recognized & supported")
  }

  public addSector(sector: Sector) {
    this.sectorList.push(sector);
    console.log("REST-API Add Sector call")
    this.httpClient.post(ORGANIZATION_ZONE_SERVICE_URL + ADD_ORGANIZATION_ZONE_URL, {
      name: sector.name,
      organizationZoneType: Sector.name.toUpperCase(),
      geoJson: JSON.stringify(sector.geoJson)
    })
      .subscribe(result => console.log(result))
  }

  public addNeighborhood(neighborhood: Neighborhood) {
    if(neighborhood.parent) {
      neighborhood.parent.neighborhoods.push(neighborhood);
    }
    console.log("REST-API Add Neighborhood call")
  }

  public addComplex(complex: Complex) {
    if(complex.parent) {
      complex.parent.children.push(complex);
    }
    console.log("REST-API Add Complex call")
  }

  public addUrbanZone(urbanZone: UrbanZone) {
    if(urbanZone.parent) {
      urbanZone.parent.children.push(urbanZone);
    }
    console.log("REST-API Add Urban Zone call")
  }
}
