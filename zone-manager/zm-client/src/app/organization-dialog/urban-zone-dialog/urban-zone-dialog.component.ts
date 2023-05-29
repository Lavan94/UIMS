import {Component, Input} from '@angular/core';
import {UrbanZone} from "../../model/Organization/UrbanZone";

@Component({
  selector: 'app-urban-zone-dialog',
  templateUrl: './urban-zone-dialog.component.html',
  styleUrls: ['./urban-zone-dialog.component.scss']
})
export class UrbanZoneDialogComponent {
  @Input() public urbanZone: UrbanZone = new UrbanZone();
}
