import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as L from "leaflet";
import {ORGANIZATION_MANAGER_PAGE} from "../app-routing.module";
import {OwnerService} from "../owner-manager/service/owner.service";
import {OwnerAuthService} from "../service/owner-auth.service";
import {Owner} from "../model/Owner";
import {Router} from "@angular/router";
import {LoginPublisherService} from "../event/login-publisher.service";

export class LoginResponse {
  public token: string = ""
  public owner: Owner = new Owner();
}

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.scss']
})
export class HomeLoginComponent implements OnInit {
  private map!: L.DrawMap;
  private centroid!: L.LatLngExpression;
  private zoom: number | undefined;
  username: any;
  email: any;
  password: any;
  phone: any;

  constructor(private ownerService: OwnerService, private ownerAuthService: OwnerAuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.zoom = 7;
    this.centroid = [
      45.908433463376355,
      24.97287425558696
    ];
    this.map = L.map('login-map', {
      center: this.centroid,
      zoom: this.zoom,
      zoomControl: false
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">',
    }).addTo(this.map);
  }

  onLogin() {
    this.ownerService.login(this.username, this.password).subscribe(
      (response) => {
        console.log(response);
        this.ownerAuthService.setToken(response.token);
        this.ownerAuthService.setRole(response.owner.role.toString())
        this.ownerAuthService.setUsername(response.owner.username)
        this.ownerAuthService.publishLogin()
        this.router.navigate([ORGANIZATION_MANAGER_PAGE])
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
