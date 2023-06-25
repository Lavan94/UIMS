import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Owner, OwnerDto, OwnerRole} from "../../model/Owner";

export const SERVER_URL = 'http://localhost:8000'
export const OWNER_URL = '/owner'

export const OWNER_SERVICE = SERVER_URL + OWNER_URL

export const GET_ALL_URL = '/getAll'
export const GET_ALL_BY_ROLE_URL = '/getAllByRole/'
export const ADD_OWNER_URL = '/add'

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  constructor(private httpClient: HttpClient) {
  }

  public getAllOwners() {
    return this.httpClient.get(OWNER_SERVICE + GET_ALL_URL)
  }

  public getAllOwnersByRole(role: OwnerRole) {
    return this.httpClient.get<Owner[]>(OWNER_SERVICE + GET_ALL_BY_ROLE_URL + role)
  }

  public addOwner(ownerDto: OwnerDto) {
    return this.httpClient.post<OwnerDto>(OWNER_SERVICE + ADD_OWNER_URL, ownerDto)
  }
}
