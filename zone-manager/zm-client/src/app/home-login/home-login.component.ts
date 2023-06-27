import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {ORGANIZATION_MANAGER_PAGE} from "../app-routing.module";
import {OwnerService} from "../owner-manager/service/owner.service";
import {OwnerAuthService} from "../service/owner-auth.service";
import {Owner} from "../model/Owner";

class LoginResponse {
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
  organizationsLink: string = ORGANIZATION_MANAGER_PAGE;

  constructor(private ownerService: OwnerService, private ownerAuthService: OwnerAuthService) {
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
        if(response instanceof LoginResponse){
          console.log(response.token)
          console.log(response.owner)
          this.ownerAuthService.setToken(response.token);
          this.ownerAuthService.setRole(response.owner.role.toString())
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
