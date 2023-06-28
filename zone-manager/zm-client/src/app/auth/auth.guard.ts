import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {OwnerAuthService} from "../service/owner-auth.service";
import {LOGIN_URL} from "../owner-manager/service/owner.service";
import {HOME_LOGIN_PAGE} from "../app-routing.module";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private ownerAuthService: OwnerAuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.ownerAuthService.getJwtToken() !== null){
      const role = route.data["role"] as string;
      if(role){
        return role === this.ownerAuthService.getRole()
      }
    }
    this.router.navigate([HOME_LOGIN_PAGE]);
    return false;
  }

}
