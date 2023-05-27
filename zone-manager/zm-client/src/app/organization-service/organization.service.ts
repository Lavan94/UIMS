import {Injectable} from '@angular/core';
import {Complex, Neighborhood, Sector, UrbanZone} from "../model/Organization";
import {SECTORS} from "../model/DummyData";

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
  constructor() {
  }

  fetchSectors(): Sector[] {
    return this.sectorList;
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

  addOrganization(organizationResult: Sector | Neighborhood | Complex | UrbanZone) {
    const orgType: string = organizationResult.constructor.name;
    if(organizationResult && this.orgMap.has(orgType)) {
      // @ts-ignore
      this.orgMap.get(orgType).call(organizationResult);
      return;
    }
    console.log("Organization type not recognized & supported")
  }

  public addSector(sector: Sector) {
    this.sectorList.push(sector);
  }

  public addNeighborhood(neighborhood: Neighborhood) {
    let parentSector = this.sectorList.find(parent => parent.id === neighborhood.parentId);
    if(!parentSector) return;
    parentSector.neighborhoods.push(neighborhood);
  }

  public addComplex(complex: Complex) {
    console.log('addComplex')
  }

  public addUrbanZone(urbanZone: UrbanZone) {
    console.log('addUrbanZone')
  }
}
