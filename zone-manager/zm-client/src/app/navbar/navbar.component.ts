import { Component } from '@angular/core';
import {ORGANIZATION_MANAGER_PAGE, OWNER_MANAGER_PAGE} from "../app-routing.module";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showFiller = false;
  zoneManagerLink: string = `/${ORGANIZATION_MANAGER_PAGE}`;
  ownerManagerLink: string = `/${OWNER_MANAGER_PAGE}`;
  page: string = 'Organizations';
  loggedIn: boolean = true;
}
