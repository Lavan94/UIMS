import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Urban_Zone} from "../../../../model/Organization/Urban_Zone";

@Component({
  selector: 'app-organization-urban-zone',
  templateUrl: './organization-urban-zone.component.html',
  styleUrls: ['./organization-urban-zone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationUrbanZoneComponent {
  @Input() currentUrbanZone: Urban_Zone = new Urban_Zone();
  displayedColumns: string[] = ['id', 'hotWater', 'coldWater', 'sewage', 'trash', 'date']
}
