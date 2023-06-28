import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnerAuthService {
  private readonly ROLES_LOCAL_STORAGE_KEY = "role";
  private readonly JWT_LOCAL_STORAGE_KEY = "jwt";
  private readonly USERNAME_STORAGE_KEY = "username"

  constructor() { }

  public setRole(role: string){
    localStorage.setItem(this.ROLES_LOCAL_STORAGE_KEY, JSON.stringify(role))
  }

  public getRole(){
    const role = localStorage.getItem(this.ROLES_LOCAL_STORAGE_KEY);
    return role ? JSON.parse(role) : undefined;
  }

  public setUsername(role: string){
    localStorage.setItem(this.USERNAME_STORAGE_KEY, JSON.stringify(role))
  }

  public getUsername(){
    const username = localStorage.getItem(this.USERNAME_STORAGE_KEY);
    return username ? JSON.parse(username) : undefined;
  }

  public setToken(jwtToken: string){
    localStorage.setItem(this.JWT_LOCAL_STORAGE_KEY, JSON.stringify(jwtToken))
  }

  public getJwtToken(): string{
    const jwtToken = localStorage.getItem(this.JWT_LOCAL_STORAGE_KEY);
    return jwtToken ? JSON.parse(jwtToken) : undefined;
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(): boolean{
    return this.getJwtToken() && this.getRole() && this.getUsername();
  }
}
