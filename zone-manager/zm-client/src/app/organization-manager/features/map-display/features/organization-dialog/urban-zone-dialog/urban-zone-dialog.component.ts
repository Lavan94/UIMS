import {Component, Input} from '@angular/core';
import {Urban_Zone, UrbanZoneType} from "../../../../../../model/Organization/Urban_Zone";

@Component({
  selector: 'app-urban-zone-dialog',
  templateUrl: './urban-zone-dialog.component.html',
  styleUrls: ['./urban-zone-dialog.component.scss']
})
export class UrbanZoneDialogComponent {
  @Input() public urbanZone: Urban_Zone = new Urban_Zone();
  public urbanZoneTypes: string[] = Object.values(UrbanZoneType)
}
