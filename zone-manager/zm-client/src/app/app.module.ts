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
import {MatDialogModule} from '@angular/material/dialog';
import { AddEditOrganizationDialogComponent } from './organization-dialog/add-organization-dialog/add-edit-organization-dialog.component';
import { SectorDialogComponent } from './organization-dialog/sector-dialog/sector-dialog.component';
import { NeighborhoodDialogComponent } from './organization-dialog/neighborhood-dialog/neighborhood-dialog.component';
import { ComplexDialogComponent } from './organization-dialog/complex-dialog/complex-dialog.component';
import { UrbanZoneDialogComponent } from './organization-dialog/urban-zone-dialog/urban-zone-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from "@angular/material/select";
import { OrganizationManagerComponent } from './organization-manager/organization-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    MapDisplayComponent,
    OrganizationDisplayComponent,
    OrganizationUrbanZoneComponent,
    MapControlContainerComponent,
    AddEditOrganizationDialogComponent,
    SectorDialogComponent,
    NeighborhoodDialogComponent,
    ComplexDialogComponent,
    UrbanZoneDialogComponent,
    OrganizationManagerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
