import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Owner, OwnerRole} from "../../../model/Owner";
import {OwnerService} from "../../service/owner.service";
import {OwnerDetailsOperation} from "../owner-details/owner-details.component";

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.scss']
})
export class OwnerTableComponent {
  @Input() owners: Owner[] = []
  @Input() ownerRole: OwnerRole = OwnerRole.NONE

  @Output() ownerRoleChangedEmitter: EventEmitter<Owner> = new EventEmitter<Owner>();
  newOwner: Owner = new Owner()

  constructor(private ownerService: OwnerService) {}

  ngOnInit(): void {
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
      case OwnerDetailsOperation.ROLE_CHANGE:
        if (!owner) break;
        this.deleteOwner(owner);
        this.ownerRoleChangedEmitter.emit(owner);
        break;
      case OwnerDetailsOperation.DELETE:
        if (!owner) break;
        this.deleteOwner(owner);
        break;
    }
  }

  private deleteOwner(owner: Owner) {
    const index = this.owners.findIndex(entry => entry.id === owner?.id);
    if (index) {
      this.owners.splice(index, 1)
    }
  }
}
