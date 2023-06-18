import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {ORGANIZATION_MANAGER_PAGE} from "../app-routing.module";

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.scss']
})
export class HomeLoginComponent implements OnInit{
  private map!: L.DrawMap;
  private centroid!: L.LatLngExpression;
  private zoom: number | undefined;
  username: any;
  email: any;
  password: any;
  phone: any;
  organizationsLink: string = ORGANIZATION_MANAGER_PAGE;
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

}
