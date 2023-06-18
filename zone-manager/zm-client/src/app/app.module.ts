import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapDisplayComponent} from './organization-manager/features/map-display/map-display.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {OrganizationDisplayComponent} from './organization-manager/features/organization-display/organization-display.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {
  OrganizationUrbanZoneComponent
} from './organization-manager/features/organization-display/organization-urban-zone/organization-urban-zone.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from '@angular/material/button';
import {MapControlContainerComponent} from './organization-manager/features/map-display/features/map-control-container/map-control-container.component';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { AddEditOrganizationDialogComponent } from './organization-manager/features/map-display/features/organization-dialog/add-organization-dialog/add-edit-organization-dialog.component';
import { SectorDialogComponent } from './organization-manager/features/map-display/features/organization-dialog/sector-dialog/sector-dialog.component';
import { NeighborhoodDialogComponent } from './organization-manager/features/map-display/features/organization-dialog/neighborhood-dialog/neighborhood-dialog.component';
import { ComplexDialogComponent } from './organization-manager/features/map-display/features/organization-dialog/complex-dialog/complex-dialog.component';
import { UrbanZoneDialogComponent } from './organization-manager/features/map-display/features/organization-dialog/urban-zone-dialog/urban-zone-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from "@angular/material/select";
import { OrganizationManagerComponent } from './organization-manager/organization-manager.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { NavbarComponent } from './navbar/navbar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterModule} from "@angular/router";
import { OwnerManagerComponent } from './owner-manager/owner-manager.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeLoginComponent } from './home-login/home-login.component';
import { OwnerTableComponent } from './owner-manager/features/owner-table/owner-table.component';

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
    NavbarComponent,
    OwnerManagerComponent,
    HomeLoginComponent,
    OwnerTableComponent,
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
    MatToolbarModule,
    MatSidenavModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
