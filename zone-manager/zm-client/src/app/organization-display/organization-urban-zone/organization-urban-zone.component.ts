import {Component, Input, OnInit} from '@angular/core';
import {UrbanZone} from "../../model/Organization";
import {URBAN_ZONE_INSTANCE} from "../../model/DummyData";
import {UtilityCost} from "../../model/UtilityCost";

@Component({
  selector: 'app-organization-urban-zone',
  templateUrl: './organization-urban-zone.component.html',
  styleUrls: ['./organization-urban-zone.component.scss'],
})
export class OrganizationUrbanZoneComponent implements OnInit {
  @Input() currentUrbanZone: UrbanZone = URBAN_ZONE_INSTANCE;
  dataSource = URBAN_ZONE_INSTANCE.utilityCosts;
  displayedColumns: string[] = ['id', 'hotWater', 'coldWater', 'sewage', 'trash', 'date']

  ngOnInit(): void {
    this.dataSource = [
      new UtilityCost("1b1a1", 56, 62, 70, 10, "Ron", new Date('15 Jan 2023 00:00:00 GMT'), "Month"),
      new UtilityCost("1b1a2", 56, 62, 70, 10, "Ron", new Date('15 Feb 2023 00:00:00 GMT'), "Month"),
      new UtilityCost("1b1a3", 56, 62, 70, 10, "Ron", new Date('15 Mar 2023 00:00:00 GMT'), "Month"),
    ]
  }
}
