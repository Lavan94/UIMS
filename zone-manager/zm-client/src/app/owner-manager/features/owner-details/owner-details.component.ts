import {Component, Input} from '@angular/core';
import {Owner} from "../../../model/Owner";

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss']
})
export class OwnerDetailsComponent {
  @Input() owner: Owner = new Owner();
}
