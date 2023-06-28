import {Component, OnInit, ViewChildren} from '@angular/core';
import {HOME_LOGIN_PAGE, ORGANIZATION_MANAGER_PAGE, OWNER_MANAGER_PAGE} from "../app-routing.module";
import {OwnerAuthService} from "../service/owner-auth.service";
import {OwnerService} from "../owner-manager/service/owner.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  showFiller = false;
  zoneManagerLink: string = `/${ORGANIZATION_MANAGER_PAGE}`;
  ownerManagerLink: string = `/${OWNER_MANAGER_PAGE}`;
  homeLoginLink: string = `/${HOME_LOGIN_PAGE}`;
  page: string = 'Login';
  loggedIn: boolean = true;

  username: string = ""
  role: string = ""

  constructor(private ownerAuthService: OwnerAuthService, private ownerService: OwnerService) {
  }

  ngOnInit(): void {
    this.loggedIn = this.ownerAuthService.isLoggedIn();
    this.username = this.ownerAuthService.getUsername();
    this.role = this.ownerService.getRoleName(this.ownerAuthService.getRole());
    if(!this.loggedIn){
      this.page = 'Login'
    }
  }

  onLogout() {
    this.page='Login';
    this.loggedIn = false;
    this.ownerAuthService.clear();
    this.username = ''
    this.role = ''
  }
}
