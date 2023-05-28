import {Component, Input} from '@angular/core';
import {Complex} from "../../model/Organization/Complex";

@Component({
  selector: 'app-complex-dialog',
  templateUrl: './complex-dialog.component.html',
  styleUrls: ['./complex-dialog.component.scss']
})
export class ComplexDialogComponent {
  @Input() public complex: Complex = new Complex();
}
