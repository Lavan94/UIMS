import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {URBAN_ZONE_INSTANCE} from "../../../../data/DummyData";
import {UrbanZone} from "../../../../model/Organization/UrbanZone";

@Component({
  selector: 'app-organization-urban-zone',
  templateUrl: './organization-urban-zone.component.html',
  styleUrls: ['./organization-urban-zone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationUrbanZoneComponent {
  @Input() currentUrbanZone: UrbanZone = URBAN_ZONE_INSTANCE;
  displayedColumns: string[] = ['id', 'hotWater', 'coldWater', 'sewage', 'trash', 'date']
}
