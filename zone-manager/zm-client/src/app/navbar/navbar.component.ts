import {Component, OnInit, ViewChildren} from '@angular/core';
import {HOME_LOGIN_PAGE, ORGANIZATION_MANAGER_PAGE, OWNER_MANAGER_PAGE} from "../app-routing.module";
import {OwnerAuthService} from "../service/owner-auth.service";
import {OwnerService} from "../owner-manager/service/owner.service";
import {LoginData, LoginPublisherService, LoginSubscriber} from "../event/login-publisher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OwnerRole} from "../model/Owner";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showFiller = false;
  zoneManagerLink: string = `/${ORGANIZATION_MANAGER_PAGE}`;
  ownerManagerLink: string = `/${OWNER_MANAGER_PAGE}`;
  homeLoginLink: string = `/${HOME_LOGIN_PAGE}`;
  page: string = '';
  loggedIn: boolean = true;

  username: string = ""
  role: string = ""

  constructor(
    private ownerAuthService: OwnerAuthService,
    private ownerService: OwnerService,
    private loginPublisherService: LoginPublisherService,
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.ownerAuthService.isLoggedIn();
    this.username = this.ownerAuthService.getUsername();
    this.role = this.ownerService.getRoleName(this.ownerAuthService.getRole());
    this.page = this.determinePage()
    this.loginPublisherService.subscribe(new LoginSubscriber(this, this.onLogin))
  }

  private determinePage() {
    const url = window.location.href;
    if(url.includes(OWNER_MANAGER_PAGE)){
      return 'Owners'
    }

    if(url.includes(ORGANIZATION_MANAGER_PAGE)){
      return 'Organizations'
    }

    return 'Login';
  }

  onLogin(loginData: LoginData){
    this.username = loginData.username;
    this.role = this.ownerService.getRoleName(loginData.role);
    this.loggedIn = true;
    this.page = this.determinePage();
  }

  onLogout() {
    this.page = 'Login';
    this.loggedIn = false;
    this.ownerAuthService.clear();
    this.username = ''
    this.role = ''
  }

  isOwnersPageLinkShowing() {
    return this.role.toLowerCase() === OwnerRole.ADMINISTRATOR.toLowerCase();
  }
}
