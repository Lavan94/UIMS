import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapDisplayComponent } from './map-display/map-display.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { OrganizationDisplayComponent } from './organization-display/organization-display.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {MatLegacyPaginatorModule} from "@angular/material/legacy-paginator";
import {MatListModule} from "@angular/material/list";
import {MatLegacyButtonModule} from "@angular/material/legacy-button";

@NgModule({
  declarations: [
    AppComponent,
    MapDisplayComponent,
    OrganizationDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    FormsModule,
    MatLegacyPaginatorModule,
    MatListModule,
    MatLegacyButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
