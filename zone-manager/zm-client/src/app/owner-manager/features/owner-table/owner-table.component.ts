import {Component} from '@angular/core';
import {Owner, OwnerRole} from "../../../model/Owner";
import {KAUFLAND_CRAIOVITA_UZ, PENNY_CRAIOVITA_UZ} from "../../../data/DummyData";

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.scss']
})
export class OwnerTableComponent {
  owners: Owner[] = [
    new Owner('1', 'Silviu', 'silviu@gmail.com', '0723 123 456', OwnerRole.ADMINISTRATOR, [KAUFLAND_CRAIOVITA_UZ, PENNY_CRAIOVITA_UZ]),
    new Owner('2', 'Silviu', 'silviu@gmail.com', '0723 123 456', OwnerRole.ADMINISTRATOR, [KAUFLAND_CRAIOVITA_UZ, PENNY_CRAIOVITA_UZ]),
    new Owner('3', 'Silviu', 'silviu@gmail.com', '0723 123 456', OwnerRole.ADMINISTRATOR, [KAUFLAND_CRAIOVITA_UZ, PENNY_CRAIOVITA_UZ]),
    new Owner('4', 'Silviu', 'silviu@gmail.com', '0723 123 456', OwnerRole.ADMINISTRATOR, [KAUFLAND_CRAIOVITA_UZ, PENNY_CRAIOVITA_UZ]),
    new Owner('5', 'Silviu', 'silviu@gmail.com', '0723 123 456', OwnerRole.ADMINISTRATOR, [KAUFLAND_CRAIOVITA_UZ, PENNY_CRAIOVITA_UZ]),
    new Owner('6', 'Silviu', 'silviu@gmail.com', '0723 123 456', OwnerRole.ADMINISTRATOR, [KAUFLAND_CRAIOVITA_UZ, PENNY_CRAIOVITA_UZ]),
    new Owner('7', 'Silviu', 'silviu@gmail.com', '0723 123 456', OwnerRole.ADMINISTRATOR, [KAUFLAND_CRAIOVITA_UZ, PENNY_CRAIOVITA_UZ]),
    new Owner('8', 'Silviu', 'silviu@gmail.com', '0723 123 456', OwnerRole.ADMINISTRATOR, [KAUFLAND_CRAIOVITA_UZ, PENNY_CRAIOVITA_UZ]),
  ]
}
