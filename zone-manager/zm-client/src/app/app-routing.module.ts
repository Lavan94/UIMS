import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from "@angular/router";
import {OrganizationManagerComponent} from "./organization-manager/organization-manager.component";
import {OwnerManagerComponent} from "./owner-manager/owner-manager.component";
import {HomeLoginComponent} from "./home-login/home-login.component";
import {AuthGuard} from "./auth/auth.guard";
import {OwnerRole} from "./model/Owner";

export const ORGANIZATION_MANAGER_PAGE = 'organization-manager';
export const OWNER_MANAGER_PAGE = 'owner-manager';
export const HOME_LOGIN_PAGE = '';

export const routes: Routes = [
  {
    path: HOME_LOGIN_PAGE, component: HomeLoginComponent, title: 'UIA - Login'
  },
  {
    path: ORGANIZATION_MANAGER_PAGE,
    component: OrganizationManagerComponent,
    title: 'UIA - Organizations',
    canActivate:[AuthGuard],
    data:{
      role: [
        OwnerRole.ADMINISTRATOR,
        OwnerRole.SERVICE_PROVIDER,
        OwnerRole.BUSINESS_OWNER,
        OwnerRole.OWNER,
      ]
    }
  },
  {
    path: OWNER_MANAGER_PAGE,
    component: OwnerManagerComponent,
    title: 'UIA - Owners',
    canActivate:[AuthGuard],
    data:{
      role: [OwnerRole.ADMINISTRATOR]
    }
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
