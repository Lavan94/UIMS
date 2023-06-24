import {Component, Input, OnInit} from '@angular/core';
import {Owner, OwnerRole} from "../../../model/Owner";
import {KAUFLAND_CRAIOVITA_UZ, PENNY_CRAIOVITA_UZ} from "../../../data/DummyData";
import {OwnerService} from "../../service/owner.service";

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.scss']
})
export class OwnerTableComponent implements OnInit {
  @Input() ownerRole?: OwnerRole
  owners: Owner[] = []

  constructor(private ownerService: OwnerService) {}

  ngOnInit(): void {
    if(this.ownerRole){
      this.ownerService.getAllOwnersByRole(this.ownerRole).subscribe((owners) => {
        this.owners = owners;
      })
    }
  }
}
