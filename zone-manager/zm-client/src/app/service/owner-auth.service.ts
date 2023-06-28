import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnerAuthService {
  private readonly ROLES_LOCAL_STORAGE_KEY = "role";
  private readonly JWT_LOCAL_STORAGE_KEY = "jwt";

  constructor() { }

  public setRole(role: string){
    localStorage.setItem(this.ROLES_LOCAL_STORAGE_KEY, JSON.stringify(role))
  }

  public getRole(){
    const role = localStorage.getItem(this.ROLES_LOCAL_STORAGE_KEY);
    return JSON.parse(role ? role : "");
  }

  public setToken(jwtToken: string){
    localStorage.setItem(this.JWT_LOCAL_STORAGE_KEY, JSON.stringify(jwtToken))
  }

  public getJwtToken(): string{
    const jwtToken = localStorage.getItem(this.JWT_LOCAL_STORAGE_KEY);
    return JSON.parse(jwtToken ? jwtToken : "");
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(): boolean{
    return this.getJwtToken().length != 0
      // && this.getRoles();
  }
}
