import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from "@angular/router";
import {OrganizationManagerComponent} from "./organization-manager/organization-manager.component";
import {OwnerManagerComponent} from "./owner-manager/owner-manager.component";
import {HOME} from "@angular/cdk/keycodes";
import {HomeLoginComponent} from "./home-login/home-login.component";

export const ORGANIZATION_MANAGER_PAGE = 'organization-manager';
export const OWNER_MANAGER_PAGE = 'owner-manager';
export const HOME_LOGIN_PAGE = '';

export const routes: Routes = [
  {
    path: HOME_LOGIN_PAGE, component: HomeLoginComponent
  },
  {
    path: ORGANIZATION_MANAGER_PAGE, component: OrganizationManagerComponent
  },
  {
    path: OWNER_MANAGER_PAGE, component: OwnerManagerComponent
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
