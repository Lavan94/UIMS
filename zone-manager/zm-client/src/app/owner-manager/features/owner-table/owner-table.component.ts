import {Component, Input, OnInit} from '@angular/core';
import {Owner, OwnerRole} from "../../../model/Owner";
import {OwnerService} from "../../service/owner.service";
import {OwnerDetailsOperation} from "../owner-details/owner-details.component";

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

  operationHandler($event: [OwnerDetailsOperation, Owner?]) {
    const operation: OwnerDetailsOperation = $event[0];
    const owner: Owner | undefined  = $event[1];

    switch (operation){
      case OwnerDetailsOperation.CANCEL:
        this.owners = this.owners.reverse();
        this.owners.pop();
        this.owners = this.owners.reverse();
        break;
      case OwnerDetailsOperation.DELETE:
        const index = this.owners.findIndex(entry => entry.id === owner?.id);
        if(index){
          this.owners.splice(index,1)
        }
        break;
    }

  }
}
