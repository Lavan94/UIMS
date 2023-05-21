import { Component } from '@angular/core';
import {Sector} from "./model/Organization";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zm-client';
  public city: string = "Craiova";
  public selectedOrganizationType: string = Sector.name;

  onSelectedOrganizationTypeChange($event: String) {
    this.selectedOrganizationType = $event.valueOf();
  }
}
