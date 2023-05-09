import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapDisplayComponent} from './map-display/map-display.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {OrganizationDisplayComponent} from './organization-display/organization-display.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {
  OrganizationUrbanZoneComponent
} from './organization-display/organization-urban-zone/organization-urban-zone.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from '@angular/material/button';
import {MapControlContainerComponent} from './map-display/map-control-container/map-control-container.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MapDisplayComponent,
    OrganizationDisplayComponent,
    OrganizationUrbanZoneComponent,
    MapControlContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    FormsModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
