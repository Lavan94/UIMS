import {Component, Input} from '@angular/core';
import {Sector} from "../../model/Organization/Sector";

@Component({
  selector: 'app-sector-dialog',
  templateUrl: './sector-dialog.component.html',
  styleUrls: ['./sector-dialog.component.scss']
})
export class SectorDialogComponent {
  @Input() public sector: Sector = new Sector();
}
