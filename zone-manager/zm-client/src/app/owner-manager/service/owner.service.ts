import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Owner, OwnerDto, OwnerRole} from "../../model/Owner";
import {LoginResponse} from "../../home-login/home-login.component";

export const SERVER_URL = 'http://localhost:8000'
export const OWNER_URL = '/owner'

export const OWNER_SERVICE = SERVER_URL + OWNER_URL

export const GET_ALL_URL = '/getAll'
export const GET_ALL_BY_ROLE_URL = '/getAllByRole/'
export const ADD_OWNER_URL = '/add'
export const EDIT_OWNER_URL = '/edit'
export const DELETE_ONE_OWNER_URL = '/deleteOne/'
export const CHANGE_OWNER_ROLE_URL = '/changeRole'

export const LOGIN_URL = '/login'

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  requestHeader = new HttpHeaders({"No-Auth": "True"});

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

  public editOwner(ownerDto: OwnerDto) {
    return this.httpClient.put<OwnerDto>(OWNER_SERVICE + EDIT_OWNER_URL, ownerDto)
  }

  public changeOwnerRole(ownerId: string, ownerRole: OwnerRole) {
    return this.httpClient.put(OWNER_SERVICE + CHANGE_OWNER_ROLE_URL, {
      uuid: ownerId,
      ownerRole: ownerRole
    })
  }

  public deleteOwner(ownerId: string) {
    return this.httpClient.delete<Owner>(OWNER_SERVICE + DELETE_ONE_OWNER_URL + ownerId)
  }

  public getRoleName(role: OwnerRole | string) {
    if(!role) return ''
    let tabName: string = role.toLocaleLowerCase();
    tabName = tabName[0].toUpperCase() + tabName.substring(1);
    return tabName.replace('_', ' ');
  }

  public login(username: string, password: string) {
    return this.httpClient.post<LoginResponse>(
      OWNER_SERVICE + LOGIN_URL,
      {
        username: username,
        password: password
      },
      {
        headers: this.requestHeader
      }
    )
  }
}
