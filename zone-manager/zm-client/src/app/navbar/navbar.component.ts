import { Component } from '@angular/core';
import {HOME_LOGIN_PAGE, ORGANIZATION_MANAGER_PAGE, OWNER_MANAGER_PAGE} from "../app-routing.module";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showFiller = false;
  zoneManagerLink: string = `/${ORGANIZATION_MANAGER_PAGE}`;
  ownerManagerLink: string = `/${OWNER_MANAGER_PAGE}`;
  homeLoginLink: string = `/${HOME_LOGIN_PAGE}`;
  page: string = 'Organizations';
  loggedIn: boolean = true;
}
