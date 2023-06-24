import {Component, Input, OnInit} from '@angular/core';
import {Owner, OwnerRole} from "../../../model/Owner";
import {OwnerService} from "../../service/owner.service";

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.scss']
})
export class OwnerTableComponent implements OnInit {
  @Input() ownerRole: OwnerRole = OwnerRole.NONE
  owners: Owner[] = []
  newOwner: Owner = new Owner()

  constructor(private ownerService: OwnerService) {}

  ngOnInit(): void {
    if(this.ownerRole){
      this.ownerService.getAllOwnersByRole(this.ownerRole).subscribe((owners) => {
        this.owners = owners;
      })
    }
  }

  addNewOwner() {
    this.owners = [new Owner()].concat(this.owners)
  }

  saveOwner(owner: Owner) {

  }

  cancelOwner(owner: Owner) {

  }
}
