import {Component, Input} from '@angular/core';
import {Neighborhood} from "../../../../../../model/Organization/Neighborhood";

@Component({
  selector: 'app-neighborhood-dialog',
  templateUrl: './neighborhood-dialog.component.html',
  styleUrls: ['./neighborhood-dialog.component.scss']
})
export class NeighborhoodDialogComponent {
  @Input() public neighborhood: Neighborhood = new Neighborhood();
}
